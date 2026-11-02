 
import crypto from "crypto";

import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

import envConfig from "../config/env.js";
import paymentModel from "../models/payment.model.js";
import webHookEventModel from "../models/webHookEvent.model.js";

import { creditWallet } from "../services/wallet.services.js";

export const razorpayWebhookController = asyncHandler(
  async (req, res) => {
     
    if (!Buffer.isBuffer(req.body)) {
      throw new AppError("Invalid webhook body", 400);
    }

    // Step 2: Razorpay headers
    const signature = req.headers["x-razorpay-signature"];
    const eventId = req.headers["x-razorpay-event-id"];

    if (!signature || !eventId) {
      throw new AppError("Webhook headers missing", 400);
    }

    // Step 3: Generate signature
    const generatedSignature = crypto
      .createHmac("sha256", envConfig.RAZORPAY_WEBHOOK_SECRET)
      .update(req.body)
      .digest("hex");

    // Step 4: Signature validation
    if (!/^[a-f0-9]{64}$/i.test(signature)) {
      throw new AppError("Invalid webhook signature", 400);
    }

    const signatureBuffer = Buffer.from(signature, "hex");
    const generatedBuffer = Buffer.from(generatedSignature, "hex");

    if (!crypto.timingSafeEqual(generatedBuffer, signatureBuffer)) {
      throw new AppError("Webhook signature verification failed", 400);
    }

    // Step 5: Parse webhook body
    let webhookData;

    try {
      webhookData = JSON.parse(req.body.toString("utf8"));
    } catch {
      throw new AppError("Invalid webhook JSON", 400);
    }

    const event = webhookData.event;

    if (!["payment.captured", "payment.failed"].includes(event)) {
      return res.status(200).json({
        success: true,
        message: "Event ignored",
      });
    }

    // Step 6: Prevent duplicate events
    let eventRecord;

    try {
      eventRecord = await webHookEventModel.create({
        eventId,
        event,
        status: "processing",
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(200).json({
          success: true,
          message: "Duplicate event ignored",
        });
      }

      throw error;
    }

    try {
       if (event === "payment.captured") {
        const razorpayPayment = webhookData.payload?.payment?.entity;

        if (
          !razorpayPayment ||
          razorpayPayment.status !== "captured" ||
          !razorpayPayment.order_id ||
          !razorpayPayment.id
        ) {
          throw new AppError("Invalid captured payment data", 400);
        }

        const payment = await paymentModel.findOne({
          razorpayOrderId: razorpayPayment.order_id,
        });

        if (!payment) {
          throw new AppError("Payment order not found", 404);
        }

        if (
          payment.amount !== razorpayPayment.amount ||
          payment.currency !== razorpayPayment.currency
        ) {
          throw new AppError("Payment amount mismatch", 400);
        }

        // Common wallet credit service
        await creditWallet({
          paymentId: payment._id,
          razorpayPaymentId: razorpayPayment.id,
        });
      }

      // payment.failed: no wallet credit.
      // Keep payment status as "created" so another payment
      // attempt for the same order can still succeed.

      // Step 8: Mark event processed
      await webHookEventModel.findByIdAndUpdate(eventRecord._id, {
        $set: {
          status: "processed",
        },
      });

      return res.status(200).json({
        success: true,
        message: "Webhook processed successfully",
      });
    } catch (error) {
      // Allow Razorpay retry if processing fails
      await webHookEventModel.findByIdAndDelete(eventRecord._id);

      throw error;
    }
  }
);
 
