import { DataTypes } from "sequelize";

const defineOrderModel = (sequelize) => {
  const Order = sequelize.define(
    "Order",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    },
    {
      tableName: "orders",
      timestamps: false,
    }
  );

  const OrderProduct = sequelize.define(
    "OrderProduct",
    {
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: Order,
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Product",
          key: "id",
        },
      },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "order_products",
      timestamps: false,
    }
  );

  Order.belongsToMany(sequelize.models.Product, {
    through: OrderProduct,
    foreignKey: "orderId",
  });
  sequelize.models.Product.belongsToMany(Order, {
    through: OrderProduct,
    foreignKey: "productId",
  });

  return { Order, OrderProduct };
};

export default defineOrderModel;
