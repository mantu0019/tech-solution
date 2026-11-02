import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "userId is required"],
    },
    amount: {
      type: Number,

      required: [true, "amount is required"],
      min: [10000, "Minimum amount is ₹100"],
      max: [200000, "Maximum amount is ₹2000"],
      validate: {
        validator: Number.isInteger,
        message: "Amount must be an integer",
      },
    },
    currency: {
      type: String,
      enum: ["INR"],
      default: "INR",
    },
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },
    razorpayPaymentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  { timestamps: true },
);

const paymentModel = mongoose.model("payment", paymentSchema);
export default paymentModel;
