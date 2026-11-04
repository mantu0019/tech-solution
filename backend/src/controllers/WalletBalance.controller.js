import userModel from "../models/user.model.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const totalWalletBalance = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id).select("walletBalance");

  if (!user) {
    throw new AppError("User not found", 401);
  }

  res.status(200).json({
    success: true,
    message: "total balance",
    data: {
      walletBalance: user.walletBalance,
    },
  });
});
