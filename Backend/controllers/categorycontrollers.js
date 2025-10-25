// @file    controllers/categoryController.js
// @desc    Handles category CRUD operations (Admin only for create, update, delete)
// @access  Public / Admin

import Category from "../models/Category.js";
import { successResponse, errorResponse } from "../constants/response.js";

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private (Admin)
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

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return successResponse(res, categories, "Categories fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// @desc    Update category details
// @route   PUT /api/categories/:id
// @access  Private (Admin)
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

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
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
