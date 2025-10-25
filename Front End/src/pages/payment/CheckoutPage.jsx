// @desc    CheckoutPage - Handles Stripe payment process and securely charges user based on cart total
// @route   Frontend Payment Page
// @access  Private (User only)

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

console.log("Stripe Public Key:", import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// ✅ Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// ✅ Checkout Form Component (handles payment confirmation)
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation(); // ✅ receives total from CartPage
  const navigate = useNavigate();

  const total = location.state?.total || 0; // ✅ ensure total is available safely

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Create payment intent on backend
      const { data } = await axios.post(
        "http://localhost:8080/api/stripe/create-payment-intent",
        { amount: total }
      );

      // ✅ Confirm payment on frontend using Stripe SDK
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("✅ Payment successful!");
        setTimeout(() => navigate("/payment-success"), 1500); // redirect to success page
      }
    } catch (err) {
      console.error("Payment error:", err);
      setMessage("❌ Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePayment}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Checkout
      </h2>

      {/* ✅ Stripe Card Input */}
      <CardElement className="p-3 border rounded mb-4" />

      {/* ✅ Payment Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? "Processing..." : `Pay ₹${total}`}
      </button>

      {/* ✅ Message display */}
      {message && <p className="mt-3 text-center text-red-500">{message}</p>}
    </form>
  );
};

// ✅ Wrap form with Stripe Elements provider
const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;


