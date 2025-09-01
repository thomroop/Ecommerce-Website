import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//  Public routes
router.get("/", getProducts);          // Get all products
router.get("/:id", getProductById);    // Get single product

//  Admin-protected routes
router.post("/", protect, admin, addProduct);      // Add new product
router.put("/:id", protect, admin, updateProduct); // Update product
router.delete("/:id", protect, admin, deleteProduct); // Delete product

export default router;
