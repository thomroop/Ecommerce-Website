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

console.log("✅ authRoutes loaded successfully");

const router = express.Router();

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @desc    Login user and return JWT token
 * @route   POST /api/auth/login
 * @access  Public
 */
router.post("/login", loginUser);

/**
 * @desc    Send OTP to user's registered email for password reset
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
router.post("/forgot-password", forgotPassword);

/**
 * @desc    Reset user password using OTP
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
router.post("/reset-password", resetPassword);

/**
 * @desc    Get logged-in user's profile
 * @route   GET /api/auth/profile
 * @access  Private (requires valid JWT token)
 */
router.get("/profile", protect, getUserProfile);

export default router;


