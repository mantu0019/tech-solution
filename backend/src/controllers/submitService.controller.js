 
// import mongoose from "mongoose";
// import userModel from "../models/user.model.js";
// import AppError from "../utils/appError.js";
// import asyncHandler from "../utils/asyncHandler.js";
// import serviceRequestModel from "../models/serviceRequest.model.js";
// import walletTransactionModel from "../models/walletTransaction.model.js";

// const FEE_CHARGED = 6000;

// export const llServiceRequestController = asyncHandler(async (req, res) => {
//   const { applicationNumber, dob, password, state } = req.body;

//   // Validate user input
//   if (!applicationNumber?.trim() || !dob || !password || !state) {
//     throw new AppError("All fields are required", 400);
//   }

//   // Validate user
//   const userExists = await userModel.findById(req.user._id);

//   if (!userExists) {
//     throw new AppError("User not found", 404);
//   }

//   // Start MongoDB transaction
//   const session = await mongoose.startSession();

//   let serviceRequest;

//   try {
//     await session.withTransaction(async () => {

//       // Deduct wallet balance
//       const user = await userModel.findOneAndUpdate(
//         {
//           _id: req.user._id,
//           walletBalance: { $gte: FEE_CHARGED },
//         },
//         {
//           $inc: { walletBalance: -FEE_CHARGED },
//         },
//         {
//           new: true,
//           session,
//         }
//       );

//       if (!user) {
//         throw new AppError("Insufficient wallet balance", 400);
//       }

//       const balanceAfter = user.walletBalance;
//       const balanceBefore = balanceAfter + FEE_CHARGED;

//       // Create service request
//       const [newServicesRequest] = await serviceRequestModel.create(
//         [
//           {
//             user: req.user._id,
//             applicationNumber: applicationNumber.trim(),
//             dob,
//             password,
//             state,
//             feeCharged: FEE_CHARGED,
//             status: "pending",
//           },
//         ],
//         { session }
//       );

//       // Create wallet transaction
//       await walletTransactionModel.create(
//         [
//           {
//             user: req.user._id,
//             type: "debit",
//             amount: FEE_CHARGED,
//             balanceBefore,
//             balanceAfter,
//             referenceType: "serviceRequest",
//             referenceId: newServicesRequest._id,
//             description: `Service charge for application ${applicationNumber.trim()}`,
//           },
//         ],
//         { session }
//       );

//       serviceRequest = newServicesRequest;
//     });

//     // Response after successful transaction commit
//     return res.status(201).json({
//       success: true,
//       message: "Service submitted successfully",
//       data: {
//         _id: serviceRequest._id,
//         applicationNumber: serviceRequest.applicationNumber,
//         dob: serviceRequest.dob,
//         state: serviceRequest.state,
//         feeCharged: serviceRequest.feeCharged,
//         status: serviceRequest.status,
//         adminMessage: serviceRequest.adminMessage,
//         createdAt: serviceRequest.createdAt,
//       },
//     });

//   } finally {
//     await session.endSession();
//   }
// });
 
import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import serviceRequestModel from "../models/serviceRequest.model.js";
import walletTransactionModel from "../models/walletTransaction.model.js";
import { encrypt } from "../utils/encryption.js";

const FEE_CHARGED = 6000;

export const llServiceRequestController = asyncHandler(async (req, res) => {
  const { applicationNumber, dob, password, state } = req.body;

  // Validate user input
  if (
    !applicationNumber?.trim() ||
    !dob ||
    !password?.trim() ||
    !state
  ) {
    throw new AppError("All fields are required", 400);
  }

  // Validate user
  const userExists = await userModel.findById(req.user._id);

  if (!userExists) {
    throw new AppError("User not found", 404);
  }

  // Start MongoDB transaction
  const session = await mongoose.startSession();

  let serviceRequest;

  try {
    await session.withTransaction(async () => {
      // Deduct wallet balance
      const user = await userModel.findOneAndUpdate(
        {
          _id: req.user._id,
          walletBalance: { $gte: FEE_CHARGED },
        },
        {
          $inc: { walletBalance: -FEE_CHARGED },
        },
        {
          new: true,
          session,
        }
      );

      if (!user) {
        throw new AppError("Insufficient wallet balance", 400);
      }

      const balanceAfter = user.walletBalance;
      const balanceBefore = balanceAfter + FEE_CHARGED;

      // Encrypt password
      const encryptedPassword = encrypt(password);

       const [newServiceRequest] = await serviceRequestModel.create(
        [
          {
            user: req.user._id,
            applicationNumber: applicationNumber.trim(),
            dob,
            passwordEncrypted: encryptedPassword,
            state,
            feeCharged: FEE_CHARGED,
            status: "pending",
          },
        ],
        { session }
      );

      // Create wallet transaction
      await walletTransactionModel.create(
        [
          {
            user: req.user._id,
            type: "debit",
            amount: FEE_CHARGED,
            balanceBefore,
            balanceAfter,
            referenceType: "serviceRequest",
            referenceId: newServiceRequest._id,
            description: `Service charge for application ${applicationNumber.trim()}`,
          },
        ],
        { session }
      );

      serviceRequest = newServiceRequest;
    });

    // Response after successful transaction commit
    return res.status(201).json({
      success: true,
      message: "Service submitted successfully",
      data: {
        _id: serviceRequest._id,
        applicationNumber: serviceRequest.applicationNumber,
        dob: serviceRequest.dob,
        state: serviceRequest.state,
        feeCharged: serviceRequest.feeCharged,
        status: serviceRequest.status,
        adminMessage: serviceRequest.adminMessage,
        createdAt: serviceRequest.createdAt,
      },
    });
  } finally {
    await session.endSession();
  }
});
 