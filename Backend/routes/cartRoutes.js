import express from "express";
import { getCart, addOrUpdateItem, removeItem, clearCart } from "../controllers/cartControllers.js";

const router = express.Router();

// Get user's cart
router.get("/:userId", getCart);

// Add or update cart item
router.post("/item", addOrUpdateItem);

// Remove item from cart
router.delete("/item", removeItem);

// Clear cart
router.delete("/clear/:userId", clearCart);

export default router;
