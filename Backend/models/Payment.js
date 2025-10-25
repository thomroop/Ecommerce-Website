// @desc    Payment Model - Stores all payment transaction details
// @route   Model
// @access  Private

import mongoose from "mongoose";

// 💳 Payment Schema Definition
const paymentSchema = new mongoose.Schema(
  {
    // Reference to the user who made the payment
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Some payments may happen before login
    },

    // Reference to the order associated with this payment
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: false, // Order may be created after successful payment
    },

    // Stripe payment intent ID (unique identifier)
    paymentId: {
      type: String,
      required: true,
    },

    // Payment amount
    amount: {
      type: Number,
      required: true,
    },

    // Payment method used
    method: {
      type: String,
      enum: ["credit card", "debit card", "UPI", "Cash on Delivery", "card"],
      default: "card", // Default method for Stripe payments
    },

    // Payment status (Pending, Completed, or Failed)
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
  }
);

// Export Payment model
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;

