import express from "express";
import {
  createCategories,
  getCategories,
  getCategoriesById,
  updateCategories,
  deleteCategories,
} from "../controllers/categoryController.js";
import validateSchema from "../middleware/validateSchema.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/categorySchema.js";

const router = express.Router();
router.post("/", validateSchema(createCategorySchema), createCategories);
router.get("/", getCategories);
router.get("/:id", getCategoriesById);
router.put("/:id", validateSchema(updateCategorySchema), updateCategories);
router.delete("/:id", deleteCategories);
export default router;
