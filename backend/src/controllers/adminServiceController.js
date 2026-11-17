 

import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import serviceRequestModel from "../models/serviceRequest.model.js";
import { decrypt } from "../utils/encryption.js";

export const getAllServiceRequestController = asyncHandler(
  async (req, res) => {
    const { page = 1, limit = 10, status, search } = req.query;

    // 1. Pagination
    const currentPage = Math.max(1, parseInt(page, 10) || 1);

    const pageLimit = Math.min(
      50,
      Math.max(1, parseInt(limit, 10) || 10)
    );

    const skip = (currentPage - 1) * pageLimit;

    // 2. Base filter
    const filter = {
      isDeleted: false,
    };
    // 3. Status filter
    if (status && status !== "all") {
      const allowedStatus = ["pending", "rejected", "success"];

      if (!allowedStatus.includes(status)) {
        throw new AppError("Invalid application status", 400);
      }

      filter.status = status;
    }

    // 4. Search filter
    if (search?.trim()) {
      const escapedSearch = search
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.applicationNumber = {
        $regex: escapedSearch,
        $options: "i",
      };
    }

    // 5. Fetch applications and total count
    const [applications, totalApplications] = await Promise.all([
      serviceRequestModel
        .find(filter)
        .select(
          "customerName serviceType applicationNumber dob passwordEncrypted state feeCharged status adminMessage reviewedAt createdAt user"
        )
        .populate("user", "fullName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageLimit)
        .lean(),

      serviceRequestModel.countDocuments(filter),
    ]);

    // 6. Decrypt passwords
    const formattedApplications = applications.map((item) => {
      const decryptedPassword = item.passwordEncrypted
        ? decrypt(item.passwordEncrypted)
        : null;

      const {
        passwordEncrypted,
        ...applicationData
      } = item;

      return {
        ...applicationData,
        password: decryptedPassword,
      };
    });

    // 7. Send response
    return res.status(200).json({
      success: true,
      message: "Service requests fetched successfully",

      data: {
        applications: formattedApplications,

        pagination: {
          currentPage,
          pageLimit,
          totalApplications,
          totalPages: Math.ceil(totalApplications / pageLimit),
          hasNextPage: currentPage * pageLimit < totalApplications,
          hasPrevPage: currentPage > 1,
        },
      },
    });
  }
);