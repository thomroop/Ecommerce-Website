// routes/bannerRoutes.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
  const bannersDir = path.join(__dirname, "../uploads/banners");
  fs.readdir(bannersDir, (err, files) => {
    if (err) return res.status(500).json({ message: "Cannot read banners" });
    // Return full URL
    const BASE_URL = `${req.protocol}://${req.get("host")}`;
    const bannerUrls = files.map((file) => `${BASE_URL}/uploads/banners/${file}`);
    res.json(bannerUrls);
  });
});

export default router;
