import serviceRequestModel from "../../models/serviceRequest.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import envConfig from "../../config/env.js";
import imagekit from "../../config/imgkit.js";
import AppError from "../../utils/appError.js";
import { Readable } from "node:stream";

// USER DASHBOARD CONTROLLER
export const getUserDashboardController = asyncHandler(
  async (req, res) => {
    const userId = req.user.id;

    const applications = await serviceRequestModel
      .find({
        user: userId,
        isDeleted: false,
      })
      .select(
        "serviceType applicationNumber dob state feeCharged status adminMessage reviewedAt createdAt resultFile"
      )
      .sort({ createdAt: -1 })
      .lean();

    // Generate signed URLs
    const updatedApplications = applications.map((application) => {
      if (!application.resultFile?.url) {
        return application;
      }

      const fileUrl = new URL(application.resultFile.url);
      const endpoint = new URL(envConfig.IMAGEKIT_URL_ENDPOINT);

      if (fileUrl.origin !== endpoint.origin) {
        return application;
      }

      const src = fileUrl.pathname.slice(endpoint.pathname.length);

      const signedUrl = imagekit.helper.buildSrc({
        urlEndpoint: envConfig.IMAGEKIT_URL_ENDPOINT,
        src: src.startsWith("/") ? src : `/${src}`,
        signed: true,
        expiresIn: 300,
      });

      return {
        ...application,
        resultFile: {
          ...application.resultFile,
          downloadUrl: signedUrl,
        },
      };
    });

    // Statistics
    const totalRequests = applications.length;

    const pendingRequests = applications.filter(
      (item) => item.status === "pending"
    ).length;

    const successfulRequests = applications.filter(
      (item) => item.status === "completed"
    ).length;

    const rejectedRequests = applications.filter(
      (item) => item.status === "rejected"
    ).length;

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
        applications: updatedApplications,
      },
    });
  }
);

// DOWNLOAD RESULT CONTROLLER
export const downloadResultController = asyncHandler(
  async (req, res) => {
    const { requestId } = req.params;
    const userId = req.user.id;

    // Find user's application
    const application = await serviceRequestModel.findOne({
      _id: requestId,
      user: userId,
      isDeleted: false,
    });

    if (!application) {
      throw new AppError("Application not found", 404);
    }

    // Check result file
    if (!application.resultFile?.url) {
      throw new AppError("Result file not available", 404);
    }

    // Validate ImageKit URL
    let fileUrl;

    try {
      fileUrl = new URL(application.resultFile.url);
    } catch {
      throw new AppError("Invalid file URL", 400);
    }

    const endpoint = new URL(envConfig.IMAGEKIT_URL_ENDPOINT);

    if (
      fileUrl.origin !== endpoint.origin ||
      !fileUrl.pathname.startsWith(
        endpoint.pathname.endsWith("/")
          ? endpoint.pathname
          : `${endpoint.pathname}/`
      )
    ) {
      throw new AppError("Invalid file source", 400);
    }

    // Generate signed URL
    const src = fileUrl.pathname.slice(endpoint.pathname.length);

    const signedUrl = imagekit.helper.buildSrc({
      urlEndpoint: envConfig.IMAGEKIT_URL_ENDPOINT,
      src: src.startsWith("/") ? src : `/${src}`,
      signed: true,
      expiresIn: 300,
    });

    // Fetch file from ImageKit
    const fileResponse = await fetch(signedUrl);

    if (!fileResponse.ok || !fileResponse.body) {
      throw new AppError("Unable to fetch result file", 502);
    }

    // File name
    const fileName = (
      application.resultFile.originalName || "result"
    ).replace(/[/\\\r\n"]/g, "_");

    // Response headers
    res.setHeader(
      "Content-Type",
      fileResponse.headers.get("content-type") ||
        "application/octet-stream"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );

    const contentLength = fileResponse.headers.get("content-length");

    if (contentLength) {
      res.setHeader("Content-Length", contentLength);
    }

    // Stream file to browser
    return Readable.fromWeb(fileResponse.body).pipe(res);
  }
);