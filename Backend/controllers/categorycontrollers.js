import Category from "../models/Category.js";
import { successResponse, errorResponse } from "../constants/response.js";

// Create category (Admin only)
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return errorResponse(res, 400, "Category already exists");
    }

    const category = await Category.create({ name, description });
    return successResponse(res, category, "Category created successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return successResponse(res, categories, "Categories fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Update category (Admin only)
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return errorResponse(res, 404, "Category not found");
    }

    category.name = req.body.name || category.name;
    category.description = req.body.description || category.description;

    await category.save();
    return successResponse(res, category, "Category updated successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Delete category (Admin only)
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return errorResponse(res, 404, "Category not found");
    }

    await category.deleteOne();
    return successResponse(res, null, "Category deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
