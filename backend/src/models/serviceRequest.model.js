import mongoose from "mongoose";

export const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu and Kashmir","Ladakh","Chandigarh",
  "Puducherry","Andaman and Nicobar Islands","Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
];

const serviceRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    customerName: { type: String, trim: true },

    // User se li jaane wali 4 cheezein
    applicationNumber: { type: String, trim: true, required: true },
    dob: { type: Date, required: true },
    password: { type: String, required: true }, // encrypted store hoga
    state: { type: String, enum: INDIAN_STATES, required: true },

    feeCharged: { type: Number, required: true, default: 60 }, // rupees

    status: {
      type: String,
      enum: ["submitted", "processing", "completed", "failed"],
      default: "submitted",
    },
  },
  { timestamps: true }
);

const serviceRequestModel = mongoose.model("serviceRequest", serviceRequestSchema);
export default serviceRequestModel;