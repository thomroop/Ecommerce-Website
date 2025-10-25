// @desc    Product Model - Stores product details such as name, price, stock, and category
// @route   Model
// @access  Private (Admin access required for product management)

import mongoose from "mongoose";

// 🛍️ Product Schema Definition
const productSchema = new mongoose.Schema(
  {
    // Product name
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces from beginning and end
    },

    // Product description
    description: {
      type: String,
      required: true,
    },

    // Product price
    price: {
      type: Number,
      required: true,
      min: 0, // Price cannot be negative
    },

    // Available stock quantity
    stock: {
      type: Number,
      required: true,
      min: 0, // Stock cannot be negative
    },

    // Reference to the product category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Linked to Category model
      required: true,
    },

    // Reference to the user who listed/sells the product
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Linked to User model
      required: true,
    },

    // Indicates if the product is active (visible to users)
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // ⏱️ Automatically adds createdAt and updatedAt fields
  }
);

// Export Product model
export default mongoose.model("Product", productSchema);
