// @desc    Order Routes - Handles order creation, retrieval, updates, and deletion
// @route   /api/orders
// @access  Private (Users & Admins)

import express from "express";
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @desc    Create a new order (when user places an order)
 * @route   POST /api/orders
 * @access  Private (User)
 */
router.post("/", protect, createOrder);

/**
 * @desc    Get all orders (admin view)
 * @route   GET /api/orders
 * @access  Private/Admin
 */
router.get("/", protect, admin, getOrders);

/**
 * @desc    Update order status or details
 * @route   PUT /api/orders/:id
 * @access  Private/Admin
 */
router.put("/:id", protect, admin, updateOrder);

/**
 * @desc    Delete an order by ID
 * @route   DELETE /api/orders/:id
 * @access  Private/Admin
 */
router.delete("/:id", protect, admin, deleteOrder);

export default router;

