import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/userControllers.js";


const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public

router.post("/register", registerUser); 


// @route   POST /api/users/login
// @desc    Login user and get token
// @access  Public// /api/users/register
router.post("/login", loginUser);        // /api/users/login

router.get("/", getAllUsers); // /api/users

export default router;
