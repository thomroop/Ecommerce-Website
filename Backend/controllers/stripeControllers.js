// @file    controllers/stripeController.js
// @desc    Handles Stripe payment processing and email notifications
// @access  Private (user payments) / Public (webhook)

import Stripe from "stripe";
import dotenv from "dotenv";
import Payment from "../models/Payment.js";
import sendPaymentEmail from "../utils/sendPaymentEmail.js";

dotenv.config();

// ✅ Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log(
  "Stripe Secret Key Loaded:",
  process.env.STRIPE_SECRET_KEY ? "✅ YES" : "❌ NO"
);

// @desc    Create a new Stripe payment intent
// @route   POST /api/stripe/create-payment-intent
// @access  Private
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, userId, email } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Valid amount is required" });
    }

    // Create payment intent in Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // INR → paise
      currency: "inr",
      automatic_payment_methods: { enabled: true },
      metadata: { userId, email },
    });

    // Save payment in MongoDB
    const payment = await Payment.create({
      userId: userId || null,
      amount,
      paymentId: paymentIntent.id,
      status: "Pending",
      method: "card",
    });

    console.log(`✅ Payment record created: ${payment.paymentId}`);

    // Send "Payment Initiated" email
    if (email) {
      try {
        await sendPaymentEmail(
          email,
          "Payment Initiated 🕒",
          amount,
          "success",
          paymentIntent.id
        );
        console.log(`📤 Payment email triggered for ${email}`);
      } catch (mailError) {
        console.error("❌ Email sending failed:", mailError.message);
      }
    }

    // Respond to frontend
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("❌ Stripe error:", error);

    // Send failure email if applicable
    if (req.body.email) {
      try {
        await sendPaymentEmail(
          req.body.email,
          "Payment Failed ❌",
          req.body.amount,
          "failed",
          "N/A"
        );
      } catch (mailError) {
        console.error("❌ Could not send failure email:", mailError.message);
      }
    }

    res.status(500).json({
      success: false,
      message: "Payment creation failed",
      error: error.message,
    });
  }
};

// @desc    Handle Stripe webhook events (payment success or failure)
// @route   POST /api/stripe/webhook
// @access  Public (called by Stripe)
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // optional for production

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle Stripe events
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log("✅ Payment succeeded:", paymentIntent.id);

      await Payment.findOneAndUpdate(
        { paymentId: paymentIntent.id },
        { status: "Completed" }
      );

      // Send success email
      const email = paymentIntent.metadata?.email;
      if (email) {
        await sendPaymentEmail(
          email,
          "Payment Successful 🎉",
          paymentIntent.amount / 100,
          "success",
          paymentIntent.id
        );
      }

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      console.log("❌ Payment failed:", paymentIntent.id);

      await Payment.findOneAndUpdate(
        { paymentId: paymentIntent.id },
        { status: "Failed" }
      );

      // Send failure email
      const email = paymentIntent.metadata?.email;
      if (email) {
        await sendPaymentEmail(
          email,
          "Payment Failed ❌",
          paymentIntent.amount / 100,
          "failed",
          paymentIntent.id
        );
      }

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};
