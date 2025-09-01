import express from "express";
import { registerUser, loginUser } from "../controllers/authcontrollers.js";

const router = express.Router();

// Registration
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

export default router;
