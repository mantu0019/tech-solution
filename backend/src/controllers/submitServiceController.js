import mongoose from "mongoose";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import userModel from "../models/user.model.js";
import serviceRequestModel from "../models/serviceRequest.model.js";
import walletTransactionModel from "../models/walletTransaction.model.js";

export const submitServiceController = asyncHandler(async (req, res) => {
  const { servicName, customerName, inputData } = req.body;

  if (!servicName || !inputData) {
    throw new AppError("Service details are required", 400);
  }

  const feeCharged = 6000;

  const session = await mongoose.startSession();

  let serviceRequest;

  try {
    await session.withTransaction(async () => {
      const user = await userModel.findOneAndUpdate(
        {
          _id: req.user._id,
          walletBalance: { $gte: feeCharged },
        },
        {
          $inc: {
            walletBalance: -feeCharged,
          },
        },
        {
          new: true,
          session,
        },
      );

      if (!user) {
        throw new AppError("insufficient wallet balance", 400);
      }

      const balanceAfter = user.walletBalance;
      const balanceBefore = balanceAfter + feeCharged;

      const [newServiceRequest] = await serviceRequestModel.create(
        [
          {
            user: req.user._id,
            serviceName,
            customerName,
            inputData,
            feeCharged,
            status: "submitted",
          },
        ],
        { session },
      );

      await walletTransactionModel.create(
        [
          {
            user: req.user._id,
            type: "debit",
            amount: feeCharged,
            balanceBefore,
            balanceAfter,
            referenceType: "serviceRequest",
            referenceId: newServiceRequest._id,
            description: `service charge for ${servicName}`,
          },
        ],
        { session },
      );

      serviceRequest = newServiceRequest;
    });
    res.status(201).json({
      success: true,
      message: "Service submitted successfully",
      data: {
        serviceRequest,
        feeCharged,
      },
    });
  } finally {
    await session.endSession();
  }
});
