// @desc    User Model - Stores all registered user information including role, contact details, and order history
// @route   Model
// @access  Private (Admin access for managing users)

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// 👤 User Schema Definition
const userSchema = new mongoose.Schema(
  {
    // Full name of the user
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // User's unique email address
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Ensures email is stored in lowercase
      trim: true,
    },

    // Email verification flag
    verifyEmail: {
      type: Boolean,
      default: false, // False until verified
    },

    // Encrypted user password
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },

    // Role-based access control
    role: {
      type: String,
      enum: ["User", "Admin"], // Defined roles
      default: "User",
    },

    // Indicates if the user account is active
    isActive: {
      type: Boolean,
      default: true,
    },

    // Current user status
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },

    // Linked addresses of the user (references Address model)
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],

    // Contact number
    phone: {
      type: String,
      required: true,
    },

    // List of user's past orders
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    // List of items currently in user's cart
    shoppingCart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Matches Product model reference
      },
    ],

    // OTP for password reset functionality
    forgotPasswordOtp: {
      type: String,
      default: null,
    },

    // Expiration time for the password reset OTP
    forgotPasswordExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // ⏱️ Automatically adds createdAt and updatedAt fields
  }
);

// Export User model
export default mongoose.model("User", userSchema);
