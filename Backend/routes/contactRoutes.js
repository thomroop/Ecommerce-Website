import express from "express";
import { submitContactForm } from "../controllers/contactControllers.js";

const router = express.Router();

// ✅ POST route to handle contact form submission
router.post("/contact", submitContactForm);

export default router;
