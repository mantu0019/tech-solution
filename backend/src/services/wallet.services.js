 
import mongoose from "mongoose";

import paymentModel from "../models/payment.model.js";
import AppError from "../utils/appError.js";
import userModel from "../models/user.model.js";
import walletTransactionModel from "../models/walletTransaction.model.js";

export const creditWallet = async ({ paymentId, razorpayPaymentId }) => {
  const session = await mongoose.startSession();

  let result;

  try {
    await session.withTransaction(async () => {
      // Step 1: Payment ko atomically update karo
      const payment = await paymentModel.findOneAndUpdate(
        {
          _id: paymentId,
          status: "created",
          razorpayPaymentId: { $exists: false },
        },
        {
          $set: {
            status: "paid",
            razorpayPaymentId,
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!payment) {
        throw new AppError(
          "Payment already processed or not found",
          409
        );
      }

      // Step 2: User find karo
      const user = await userModel
        .findById(payment.user)
        .select("walletBalance")
        .session(session);

      if (!user) {
        throw new AppError("User not found", 404);
      }

      // Step 3: Previous balance
      const balanceBefore = user.walletBalance;

      // Step 4: Wallet balance credit karo
      const updateUser = await userModel.findOneAndUpdate(
        { _id: payment.user },
        {
          $inc: {
            walletBalance: payment.amount,
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!updateUser) {
        throw new AppError("User not found", 404);
      }

      // Step 5: Updated balance
      const balanceAfter = updateUser.walletBalance;

      // Step 6: Transaction history create karo
      await walletTransactionModel.create(
        [
          {
            user: payment.user,
            type: "credit",
            amount: payment.amount,
            balanceBefore,
            balanceAfter,
            referenceType: "payment",
            referenceId: payment._id,
            description: "Wallet deposit through Razorpay",
          },
        ],
        { session }
      );

      // Step 7: Result prepare karo
      result = {
        paymentId: payment._id,
        razorpayPaymentId: payment.razorpayPaymentId,
        amount: payment.amount,
        walletBalance: balanceAfter,
        status: payment.status,
      };

      return result;
    });

    // Important: Outer function se result return karo
    return result;

  } finally {
    // Step 8: Session close karo
    await session.endSession();
  }
};
 
