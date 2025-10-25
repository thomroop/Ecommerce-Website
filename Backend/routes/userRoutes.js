import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js"; 

const router = express.Router();


// @desc    Register a new user
// @access  Public

router.post("/register", registerUser);


// @route   POST /api/users/login
// @desc    Login user and get token
// @access  Public

router.post("/login", loginUser);


// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private/Admin

router.get("/", protect, admin, getAllUsers);



export default router;

