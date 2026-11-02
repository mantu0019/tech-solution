import crypto from "crypto";

import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

import paymentModel from "../models/payment.model.js";

import envConfig from "../config/env.js";
import razorpay from "../config/razorpay.config.js";

import { creditWallet } from "../services/wallet.services.js";

export const verifyPaymentController = asyncHandler(async (req, res) => {

  // 1. Get payment details from frontend

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature
  ) {
    throw new AppError("Payment details are required", 400);
  }

  // 2. Find payment belonging to logged-in user

  const payment = await paymentModel.findOne({
    razorpayOrderId: razorpay_order_id,
    user: req.user._id,
  });

  if (!payment) {
    throw new AppError("Payment order not found", 404);
  }

  if (payment.status === "paid") {
    throw new AppError("Payment already verified", 409);
  }

  // 3. Generate Razorpay signature

  const generatedSignature = crypto
    .createHmac("sha256", envConfig.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  // 4. Validate signature format

  if (
    typeof razorpay_signature !== "string" ||
    !/^[a-f0-9]{64}$/i.test(razorpay_signature)
  ) {
    throw new AppError("Invalid payment signature", 400);
  }

  // 5. Compare signatures securely

  const signatureBuffer = Buffer.from(razorpay_signature, "hex");
  const generatedBuffer = Buffer.from(generatedSignature, "hex");

  if (!crypto.timingSafeEqual(generatedBuffer, signatureBuffer)) {
    throw new AppError("Invalid payment signature", 400);
  }

  // 6. Fetch actual payment details from Razorpay

  const razorpayPayment = await razorpay.payments.fetch(
    razorpay_payment_id
  );

  if (
    razorpayPayment.order_id !== razorpay_order_id ||
    razorpayPayment.amount !== payment.amount ||
    razorpayPayment.currency !== payment.currency ||
    razorpayPayment.status !== "captured"
  ) {
    throw new AppError("Payment verification failed", 400);
  }

  // 7. Credit wallet using common service

  const result = await creditWallet({
    paymentId: payment._id,
    razorpayPaymentId: razorpay_payment_id,
  });

  // 8. Send response

  res.status(200).json({
    success: true,
    message: "Payment verified and wallet credited successfully",
    data: result,
  });

});