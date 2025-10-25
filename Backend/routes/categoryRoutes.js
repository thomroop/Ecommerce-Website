// @desc    Category Routes - Handles category creation, retrieval, update, and deletion
// @route   /api/categories
// @access  Public (read) / Private-Admin (create, update, delete)

import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @desc    Create a new category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
router.post("/", protect, admin, createCategory);

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
router.get("/", getCategories);

/**
 * @desc    Update an existing category by ID
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
router.put("/:id", protect, admin, updateCategory);

/**
 * @desc    Delete a category by ID
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
router.delete("/:id", protect, admin, deleteCategory);

export default router;
