import db from "../db/db.js";

export const createCategories = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    const Categories = await db.Categories.create({ name });
    res.status(201).json(Categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//  Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await db.Categories.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//  Get Categories by ID
export const getCategoriesById = async (req, res) => {
  try {
    const { id } = req.params;
    const Categories = await db.Categories.findByPk(id);
    if (!Categories)
      return res.status(404).json({ error: "Categories not found" });
    res.status(200).json(Categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//  Update Categories
export const updateCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const Categories = await db.Categories.findByPk(id);
    if (!Categories)
      return res.status(404).json({ error: "Categories not found" });
    Categories.name = name || Categories.name;
    await Categories.save();
    res.status(200).json(Categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//  Delete Categories
export const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const Categories = await db.Categories.findByPk(id);
    if (!Categories)
      return res.status(404).json({ error: "Categories not found" });
    await Categories.destroy();
    res.status(200).json({ message: "Categories deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
