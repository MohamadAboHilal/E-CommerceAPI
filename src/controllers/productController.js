import Product from "../models/productModel.js";
import db from "../db/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    let category;
    if (req.body.category_id) {
      category = await db.Categories.findByPk(req.body.category_id);
      if (!category) {
        return res
          .status(404)
          .json({ error: "Category not found with the provided category_id" });
      }
    } else if (req.body.category_name) {
      category = await db.Categories.findOne({
        where: { name: req.body.category_name },
      });
      if (!category) {
        category = await db.Categories.create({ name: req.body.category_name });
      }
      req.body.category_id = category.id;
    } else {
      return res.status(400).json({
        error:
          "Category information is required (provide category_id or category_name)",
      });
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (req.body.category_id) {
      const category = await db.Categories.findByPk(req.body.category_id);
      if (!category) {
        return res
          .status(404)
          .json({ error: "Category not found with the provided category_id" });
      }
    } else if (req.body.category_name) {
      let category = await db.Categories.findOne({
        where: { name: req.body.category_name },
      });
      if (!category) {
        category = await db.Categories.create({ name: req.body.category_name });
      }
      req.body.category_id = category.id;
    }

    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
