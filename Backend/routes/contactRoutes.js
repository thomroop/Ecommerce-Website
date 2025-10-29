import express from "express";
import { submitContactForm } from "../controllers/contactControllers.js";

const router = express.Router();

// ✅ Correct route (only "/") — since app.js already mounts at /api/contact
router.post("/", submitContactForm);

export default router;
