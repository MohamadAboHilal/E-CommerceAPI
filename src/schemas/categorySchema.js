import Joi from "joi";
// Schema for creating a category
export const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Category name must be a string",
    "string.empty": "Category name cannot be empty",
    "string.min": "Category name must have at least 2 characters",
    "string.max": "Category name cannot exceed 50 characters",
    "any.required": "Category name is required",
  }),
});
// Schema for updating a category
export const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).optional().messages({
    "string.base": "Category name must be a string",
    "string.empty": "Category name cannot be empty",
    "string.min": "Category name must have at least 2 characters",
    "string.max": "Category name cannot exceed 50 characters",
  }),
});
