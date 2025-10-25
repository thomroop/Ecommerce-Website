// @desc    Cart Routes - Manages user cart operations such as add, update, remove, and view summary
// @route   /api/cart
// @access  Private (requires authentication)

import express from "express";
import {
  getCart,
  addOrUpdateItem,
  removeItem,
  clearCart,
  getCartSummary, // ✅ Fetch cart statistics (admin only)
} from "../controllers/cartcontrollers.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ All routes below require user authentication
router.use(protect);

/**
 * @desc    Get the current user's cart
 * @route   GET /api/cart
 * @access  Private
 */
router.get("/", getCart);

/**
 * @desc    Add or update an item in the user's cart
 * @route   POST /api/cart/item
 * @access  Private
 */
router.post("/item", addOrUpdateItem);

/**
 * @desc    Remove a specific item from the cart
 * @route   DELETE /api/cart/item/:productId
 * @access  Private
 */
router.delete("/item/:productId", removeItem);

/**
 * @desc    Clear all items from the user's cart
 * @route   DELETE /api/cart/clear
 * @access  Private
 */
router.delete("/clear", clearCart);

/**
 * @desc    Get a summary of all carts in the system (for admin reporting)
 * @route   GET /api/cart/summary
 * @access  Private/Admin
 */
router.get("/summary", protect, admin, getCartSummary);

export default router;
