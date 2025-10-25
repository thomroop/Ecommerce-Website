// @desc    Order Model - Stores customer order details and status
// @route   Model
// @access  Private
import mongoose from "mongoose";

// Define schema for customer orders
const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User (customer)
      required: true,
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to Product
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Minimum 1 item per product
        },
        price: {
          type: Number,
          required: true, // Product price at time of order
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true, // Total cost of all ordered items
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"], // Allowed values
      default: "Pending", // Default order status
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment", // Reference to Payment model
    },

    deliveryPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to delivery staff
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Export Order model
export default mongoose.model("Order", orderSchema);

