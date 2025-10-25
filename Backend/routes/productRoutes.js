// @desc    Product Routes - Handles all product-related operations such as listing, fetching details, creation, update, and deletion
// @route   /api/products
// @access  Public (read) / Private-Admin (create, update, delete)

import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @desc    Get all available products
 * @route   GET /api/products
 * @access  Public
 */
router.get("/", getProducts);

/**
 * @desc    Get a single product by its ID
 * @route   GET /api/products/:id
 * @access  Public
 */
router.get("/:id", getProductById);

/**
 * @desc    Add a new product (Admin only)
 * @route   POST /api/products
 * @access  Private/Admin
 */
router.post("/", protect, admin, addProduct);

/**
 * @desc    Update an existing product by ID
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
router.put("/:id", protect, admin, updateProduct);

/**
 * @desc    Delete a product by ID
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
router.delete("/:id", protect, admin, deleteProduct);

export default router;
