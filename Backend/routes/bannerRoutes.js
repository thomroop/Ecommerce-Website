// @desc    Banner Routes - Handles fetching all uploaded banner images from the server
// @route   /api/banners
// @access  Public

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// ✅ Get current directory name for ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @desc    Fetch all banner image URLs from the uploads folder
 * @route   GET /api/banners
 * @access  Public
 */
router.get("/", (req, res) => {
  const bannersDir = path.join(__dirname, "../uploads/banners");

  // Read all files from the 'uploads/banners' directory
  fs.readdir(bannersDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Cannot read banners" });
    }

    // Construct base URL dynamically
    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    // Create array of banner image URLs
    const bannerUrls = files.map(
      (file) => `${BASE_URL}/uploads/banners/${file}`
    );

    // Send all banner URLs as response
    res.json(bannerUrls);
  });
});

export default router;
