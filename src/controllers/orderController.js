import { Order, OrderProduct, Product } from "../db/db.js";

// get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: Product,
        through: {
          attributes: ["quantity"],
        },
        attributes: ["id", "name"],
      },
    });

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      userId: order.userId,
      products: order.Products.map((product) => ({
        productId: product.id,
        quantity: product.OrderProduct.quantity,
      })),
      total: order.total,
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: error.message });
  }
};

// get a single order by id
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id, {
      include: {
        model: Product,
        through: {
          attributes: ["quantity"],
        },
        attributes: ["id", "name"],
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const formattedOrder = {
      id: order.id,
      userId: order.userId,
      products: order.Products.map((product) => ({
        productId: product.id,
        quantity: product.OrderProduct.quantity,
      })),
      total: order.total,
    };

    res.json(formattedOrder);
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ error: error.message });
  }
};

// create a new order
export const createOrder = async (req, res) => {
  const { userId, products } = req.body;

  try {
    let total = 0;

    // Calculate the total price of the order
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        total += product.price * item.quantity;
      } else {
        return res
          .status(404)
          .json({ error: `Product with id ${item.productId} not found` });
      }
    }

    // Create the order
    const order = await Order.create({ userId, total });

    // Create the order-product relationships
    for (const item of products) {
      await OrderProduct.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      });
    }

    // Respond with the created order
    res.status(201).json({
      id: order.id,
      userId: order.userId,
      products,
      total: order.total,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
};

// update an order
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { userId, products } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    let total = 0;

    // Calculate the total price of the order
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        total += product.price * item.quantity;
      } else {
        return res
          .status(404)
          .json({ error: `Product with id ${item.productId} not found` });
      }
    }

    // Update the order
    await order.update({ userId, total });

    // Delete existing order-product relationships
    await OrderProduct.destroy({ where: { orderId: order.id } });

    // Create new order-product relationships
    for (const item of products) {
      await OrderProduct.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      });
    }

    // Respond with the updated order
    res.json({
      id: order.id,
      userId: order.userId,
      products,
      total: order.total,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: error.message });
  }
};

// delete an order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Delete the order and its associated order-product relationships
    await OrderProduct.destroy({ where: { orderId: order.id } });
    await order.destroy();

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: error.message });
  }
};
