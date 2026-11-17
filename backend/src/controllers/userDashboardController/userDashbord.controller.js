import serviceRequestModel from "../../models/serviceRequest.model.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getUserDashboardController = asyncHandler(
  async (req, res) => {
    const userId = req.user.id;

    // Fetch user's applications
    const applications = await serviceRequestModel
      .find({
        user: userId,
        isDeleted: false,
      })
      .select(
        "serviceType applicationNumber dob state feeCharged status adminMessage reviewedAt createdAt"
      )
      .sort({ createdAt: -1 })
      .lean();

    // Calculate statistics
    const totalRequests = applications.length;

    const pendingRequests = applications.filter(
      (item) => item.status === "pending"
    ).length;

    const successfulRequests = applications.filter(
      (item) => item.status === "approved"
    ).length;

    const rejectedRequests = applications.filter(
      (item) => item.status === "rejected"
    ).length;

    // Send response
    return res.status(200).json({
      success: true,
      message: "User Dashboard fetched successfully",
      data: {
        statistics: {
          totalRequests,
          pendingRequests,
          successfulRequests,
          rejectedRequests,
        },
        applications,
      },
    });
  }
);