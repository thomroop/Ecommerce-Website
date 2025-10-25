// @desc    CheckoutForm Component - Handles Stripe payment confirmation and user feedback during checkout
// @route   Frontend Component
// @access  Private (accessible to authenticated users during checkout)

import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success",
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Payment successful!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Complete Payment
      </h2>

      <PaymentElement />

      <button
        disabled={!stripe || loading}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {message && (
        <div className="mt-4 text-center text-red-500 font-medium">{message}</div>
      )}
    </form>
  );
};

export default CheckoutForm;
