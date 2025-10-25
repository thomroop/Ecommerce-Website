// @desc    Payment Routes - Handles payment processing through Stripe
// @route   /api/payment
// @access  Private (requires authentication before initiating payment)

import express from "express";
import { createPaymentIntent } from "../controllers/stripeControllers.js";

const router = express.Router();

/**
 * @desc    Create a Stripe Payment Intent
 * @route   POST /api/payment/create-payment-intent
 * @access  Private
 * @details This route initiates a payment request to Stripe and returns a client secret
 *          used on the frontend to complete the payment securely.
 */
router.post("/create-payment-intent", createPaymentIntent);

export default router;
