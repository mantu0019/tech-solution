 
import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    serviceName: {
      type: String,
      required: true,
      trim: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    referenceNumber: {
      type: String,
      required: true,
      trim: true,
    },

    feeCharged: {
      type: Number,
      required: true,
      default: 6000, // ₹60 in paise
    },

    status: {
      type: String,
      enum: ["submitted", "processing", "completed", "failed"],
      default: "submitted",
    },
  },
  {
    timestamps: true,
  }
);

const serviceRequestModel = mongoose.model(
  "serviceRequest",
  serviceRequestSchema
);

export default serviceRequestModel;
 
