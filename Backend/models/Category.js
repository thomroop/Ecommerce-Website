// @desc    Category Model - Stores product categories with name and description
// @route   Model
// @access  Private/Admin
import mongoose from "mongoose";

// Define schema for product categories
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Prevents duplicate category names
      trim: true,   // Removes extra spaces
    },
    description: {
      type: String,
      trim: true,   // Clean category description
    },
    isActive: {
      type: Boolean,
      default: true, // true = active category, false = inactive
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create and export Category model
const Category = mongoose.model("Category", categorySchema);
export default Category;
