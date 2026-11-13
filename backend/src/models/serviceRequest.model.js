 
// import mongoose from "mongoose";

// export const INDIAN_STATES = [
//   "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
//   "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
//   "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
//   "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
//   "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
//   "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh",
//   "Chandigarh", "Puducherry",
//   "Andaman and Nicobar Islands",
//   "Dadra and Nagar Haveli and Daman and Diu",
//   "Lakshadweep",
// ];

// const serviceRequestSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users",
//       required: true,
//     },

//     customerName: {
//       type: String,
//       trim: true,
//     },

//     // User Input Fields
//     applicationNumber: {
//       type: String,
//       trim: true,
//       required: true,
//     },

//     dob: {
//       type: Date,
//       required: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     state: {
//       type: String,
//       enum: INDIAN_STATES,
//       required: true,
//     },

//     // Service Fee (Paise)
//     feeCharged: {
//       type: Number,
//       required: true,
//       default: 6000,
//     },

//     // Admin Approval Status
//     status: {
//       type: String,
//       enum: ["pending", "rejected", "success"],
//       default: "pending",
//     },

//     // Admin Response
//     adminMessage: {
//       type: String,
//       trim: true,
//       default: "",
//     },

//     reviewedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users",
//       default: null,
//     },

//     reviewedAt: {
//       type: Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const serviceRequestModel = mongoose.model(
//   "serviceRequest",
//   serviceRequestSchema
// );

// export default serviceRequestModel;



import mongoose from "mongoose";

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Chandigarh",
  "Puducherry",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
];

const serviceRequestSchema = new mongoose.Schema(
  {
    // User Information
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    customerName: {
      type: String,
      trim: true,
    },

    // Service Information
    serviceType: {
      type: String,
      required: true,
      default: "LL",
    },

    // Application Details
    applicationNumber: {
      type: String,
      trim: true,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    // Encrypted Password
    passwordEncrypted: {
      type: String,
      required: true,
      select: false,
    },

    state: {
      type: String,
      enum: INDIAN_STATES,
      required: true,
    },

    // Service Fee (Paise)
    feeCharged: {
      type: Number,
      required: true,
      default: 6000,
    },

    // Application Status
    status: {
      type: String,
      enum: ["pending", "rejected", "success"],
      default: "pending",
      index: true,
    },

    // Admin Response
    adminMessage: {
      type: String,
      trim: true,
      default: "",
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },

    // Soft Delete
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// User application history index
serviceRequestSchema.index({
  user: 1,
  createdAt: -1,
  
});

const serviceRequestModel = mongoose.model(
  "serviceRequest",
  serviceRequestSchema
);

export default serviceRequestModel;