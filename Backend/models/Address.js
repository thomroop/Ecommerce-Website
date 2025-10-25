// @desc    Address Model - Stores user shipping or billing address details
// @route   Model
// @access  Private
import mongoose from "mongoose";

// Create schema for user addresses
const addressSchema = new mongoose.Schema(
  {
    addressLine: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
    },
    country: {
      type: String,
    },
    mobile: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: true, // true = active, false = inactive
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // ✅ optional but recommended (links address to user)
      required: true,
    },
  },
  {
    timestamps: true, // ✅ moved this inside the schema options (correct place)
  }
);

// Export the Address model
export default mongoose.model("Address", addressSchema);
