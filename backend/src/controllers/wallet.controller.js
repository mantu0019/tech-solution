import razorpay from "../config/razorpay.config.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import paymentModel from "../models/payment.model.js";
import envConfig from "../config/env.js";

export const addMoneyController = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!Number.isInteger(amount) || amount < 100 || amount > 2000) {
    throw new AppError(" Invalid amount", 400);
  }

  const amountInPaise = amount * 100;

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt: `wallet_${Date.now()}`,
  });

  const payment = await paymentModel.create({
    user: req.user._id,
    amount: amountInPaise,
    currency: "INR",
    razorpayOrderId: order.id,
    status: "created",
  });

  res.status(201).json({
    success: true,
    message: "Razorpay order created successfully",
    data: {
      paymentId: payment._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: envConfig.RAZORPAY_KEY_ID,
    },
  });
});
