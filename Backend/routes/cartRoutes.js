import express from "express";

import {
  getCart,
  addOrUpdateItem,
  removeItem,
  clearCart,
  getCartSummary, // ✅ new function
} from "../controllers/cartcontrollers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// Get current user's cart
router.get("/", getCart);

// Add or update an item in the cart
router.post("/item", addOrUpdateItem);

// Remove an item from the cart
router.delete("/item/:productId", removeItem);

// Clear the cart
router.delete("/clear", clearCart);

// 🧾 Get cart summary (admin only)
router.get("/summary", protect, admin, getCartSummary);

export default router;
