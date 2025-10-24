// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);          // User places order
router.get("/", protect, admin, getOrders);      // Admin views all orders
router.put("/:id", protect, admin, updateOrder); // Admin updates order
router.delete("/:id", protect, admin, deleteOrder); // Admin deletes order

export default router;
