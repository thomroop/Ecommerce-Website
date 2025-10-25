// @desc    Cart Model - Stores products added to the user's shopping cart
// @route   Model
// @access  Private
import mongoose from "mongoose";

// Define schema for individual cart items
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1, // Default quantity = 1
  },
});

// Define main cart schema (one cart per user)
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
      unique: true, // Ensures each user has only one cart
    },
    items: [cartItemSchema], // Array of product items
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Export Cart model
export default mongoose.model("Cart", cartSchema);

