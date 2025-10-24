import Stripe from "stripe";
import dotenv from "dotenv";
import Payment from "../models/Payment.js"; // ✅ ADD THIS import to save payments in DB
dotenv.config();

// ✅ Initialize Stripe with your Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("Stripe Secret Key Loaded:", process.env.STRIPE_SECRET_KEY ? "✅ YES" : "❌ NO");

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, userId } = req.body; // ✅ include userId if available from frontend

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Valid amount is required" });
    }

    // ✅ Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // convert to paise
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    // ✅ Save payment record in MongoDB
    await Payment.create({
      userId: userId || null,
      amount,
      paymentId: paymentIntent.id,
      status: "Pending",
      method: "card",
    });

    // ✅ Send client secret to frontend
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({
      success: false,
      message: "Payment failed",
      error: error.message,
    });
  }
};
