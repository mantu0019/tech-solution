 
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import serviceRequestModel from "../models/serviceRequest.model.js";

export const getAllServiceRequestController = asyncHandler(
  async (req, res) => {
    const { page = 1, limit = 10, status, search } = req.query;

    // Pagination
    const currentPage = Math.max(1, parseInt(page) || 1);

    const pageLimit = Math.min(
      50,
      Math.max(1, parseInt(limit) || 10)
    );

    const skip = (currentPage - 1) * pageLimit;

    // Filter
    const filter = {
      isDeleted: false,
    };

    // Status filter
    if (status) {
      const allowedStatus = ["pending", "rejected", "success"];

      if (!allowedStatus.includes(status)) {
        throw new AppError("Invalid application status", 400);
      }

      filter.status = status;
    }

    // Search filter
    if (search?.trim()) {
      const escapedSearch = search.trim().replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.applicationNumber = {
        $regex: escapedSearch,
        $options: "i",
      };
    }

    // Fetch applications
    const [applications, totalApplications] = await Promise.all([
      serviceRequestModel
        .find(filter)
        .select(
          "customerName serviceType applicationNumber dob state feeCharged status adminMessage reviewedAt createdAt"
        )
        .populate("user", "fullName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageLimit)
        .lean(),

      serviceRequestModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      message: "Service requests fetched successfully",

      data: {
        applications,

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
 