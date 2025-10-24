import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    verifyEmail: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },

    role: {
      type: String,
      enum: ["User", "Admin"], // capitalized Admin
      default: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },

    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],

    phone: {
      type: String,
      required: true,
    },

    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    shoppingCart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // should match Product model
      },
    ],

    forgotPasswordOtp: {
      type: String,
      default: null,
    },

    forgotPasswordExpiry: {
      type: Date,
      default: null
    },
  },
  {
    timestamps: true, // ✅ correct place
  }
);

export default mongoose.model("User", userSchema);
