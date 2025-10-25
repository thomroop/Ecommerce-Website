// @desc    Image Upload Routes - Handles multiple image uploads and stores them on the server
// @route   /api/upload
// @access  Private/Admin (recommended for product image management)

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// ✅ Directory where uploaded images will be stored
const uploadDir = "uploads/airpods";

// ✅ Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer storage configuration
const storage = multer.diskStorage({
  // Destination path for uploaded files
  destination(req, file, cb) {
    cb(null, uploadDir);
  },

  // Define unique filename (e.g., images-1698347263123.jpg)
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// ✅ Validate file type before upload (only image formats allowed)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only (jpg, jpeg, png, webp)!"));
  }
}

// ✅ Initialize multer with storage and file filter
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

/**
 * @desc    Upload multiple images to the server
 * @route   POST /api/upload
 * @access  Private/Admin
 * @details Accepts up to 10 images at a time, validates file type, and stores
 *          them in the `uploads/airpods` directory. Returns file paths as response.
 */
router.post("/", upload.array("images", 10), (req, res) => {
  // req.files contains array of uploaded files
  const filePaths = req.files.map((file) => file.path);

  // Respond with success message and image paths
  res.json({
    message: "Images uploaded successfully",
    imagePaths: filePaths,
  });
});

export default router;
