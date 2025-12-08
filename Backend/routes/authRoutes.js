// @desc    Authentication Routes - Handles user registration, login, password reset, and profile retrieval
// @route   /api/auth
// @access  Public (some routes are protected)

import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
} from "../controllers/authcontrollers.js";

import { protect } from "../middleware/authMiddleware.js"; // ✅ Middleware to verify JWT token

// This will show in your Render logs when the file is loaded
console.log("✅ authRoutes loaded successfully");

const router = express.Router();

// -------------------------
// 🔍 Debug Route
// -------------------------
// URL: GET /api/auth/debug
router.get("/debug", (req, res) => {
  console.log("🔍 /api/auth/debug hit");
  res.json({ message: "Auth routes are working" });
});

// -------------------------
// 📝 Register User
// -------------------------
// URL: POST /api/auth/register
router.post("/register", registerUser);

// -------------------------
// 🔑 Login User
// -------------------------
// URL: POST /api/auth/login
router.post("/login", loginUser);

// -------------------------
// 🔁 Forgot Password (Send OTP)
// -------------------------
// URL: POST /api/auth/forgot-password
router.post("/forgot-password", forgotPassword);

// -------------------------
// 🔁 Reset Password Using OTP
// -------------------------
// URL: POST /api/auth/reset-password
router.post("/reset-password", resetPassword);

// -------------------------
// 👤 Get Logged-in User Profile
// -------------------------
// URL: GET /api/auth/profile
// Access: Private (JWT required)
router.get("/profile", protect, getUserProfile);

export default router;
