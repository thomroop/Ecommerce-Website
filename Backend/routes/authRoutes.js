import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile, 
   
} from "../controllers/authcontrollers.js";

import { protect } from "../middleware/authMiddleware.js"; // ✅ Add this


console.log("✅ authRoutes loaded successfully");

const router = express.Router();

// Registration
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password", resetPassword);

// ✅ NEW: Get Logged-In User Profile
router.get("/profile", protect, getUserProfile);

export default router;



