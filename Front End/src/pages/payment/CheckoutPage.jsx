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

// Do NOT console.log secrets in production
// console.log("Stripe Public Key:", import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
// Add to .env: VITE_API_BASE_URL="https://your-backend.onrender.com/api"
// and VITE_STRIPE_PUBLIC_KEY="pk_live_..."

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // total expected to be in rupees (e.g. 499.5). fallback to 0
  const total = Number(location.state?.total ?? 0);

  const handlePayment = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet. Please wait a moment and try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMessage("Payment form not ready. Please refresh the page.");
      return;
    }

    // convert to smallest currency unit (paise for INR)
    const amountToSend = Math.max(0, Math.round(total * 100));

    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // include if backend requires auth

      // create payment intent on backend
      const { data } = await axios.post(
        `${API_BASE_URL}/stripe/create-payment-intent`,
        { amount: amountToSend, currency: "INR" },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!data?.clientSecret) {
        throw new Error("No client secret returned from server.");
      }

      // confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        // Card was declined or other client-side error
        console.error("Stripe confirm error:", result.error);
        setMessage(result.error.message || "Payment failed. Please try another card.");
      } else if (result.paymentIntent) {
        if (result.paymentIntent.status === "succeeded") {
          setMessage("✅ Payment successful! Redirecting...");
          // optionally call your backend to mark order as paid / create order record
          setTimeout(() => navigate("/payment-success"), 1000);
        } else {
          setMessage(`Payment status: ${result.paymentIntent.status}`);
        }
      } else {
        setMessage("Unexpected response from Stripe. Please contact support.");
      }
    } catch (err) {
      console.error("Payment error:", err?.response?.data ?? err);
      // show useful message when backend returns details
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "❌ Payment failed. Please try again.";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePayment}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Checkout</h2>

      <div className="mb-4">
        <label className="block text-sm text-slate-700 mb-2">Card details</label>
        <div className="p-3 border rounded">
          <CardElement />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        aria-busy={loading}
        aria-disabled={!stripe || loading}
        className={`w-full ${loading ? "opacity-60 cursor-not-allowed" : ""} bg-green-600 text-white py-2 rounded hover:bg-green-700 transition`}
      >
        {loading ? "Processing..." : `Pay ₹${total}`}
      </button>

      {message && (
        <p className={`mt-3 text-center ${message.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </form>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;



