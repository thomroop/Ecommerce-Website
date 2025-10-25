// @desc    PaymentSuccess Page - Displays confirmation message after successful payment
// @route   Frontend Payment Success Page
// @access  Private (User only)

import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      {/* ✅ Success Message */}
      <h1 className="text-3xl font-bold text-green-600 mb-3">
        💰 Payment Successful!
      </h1>

      {/* ✅ Description */}
      <p className="text-gray-700 mb-6 max-w-md">
        Thank you for your purchase. Your order has been placed successfully.
        You will receive an email confirmation shortly.
      </p>

      {/* ✅ Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;

