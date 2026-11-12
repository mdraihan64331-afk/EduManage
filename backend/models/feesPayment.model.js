import mongoose from "mongoose";

const feesPaymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddStudent",
      required: true,
    },

    feesType: {
      type: String,
      enum: ["Monthly Fee", "Exam Fee", "Registration Fee"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Bkash", "Nagad", "Bank Transfer", "Cash"],
      required: true,
    },

    paymentDate: {
      type: Date,
      required: true,
    },

    remark: {
      type: String,
    },
  },
  { timestamps: true },
);

export const FeesPayment = new mongoose.model("FeesPayment", feesPaymentSchema);
