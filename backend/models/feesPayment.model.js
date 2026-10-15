import mongoose from "mongoose";

const classFeesShema = mongoose.Schema(
  {
    className: {
      type: String,
      enum: [
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5",
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10",
      ],
      required: true,
    },

    academicYear: {
      type: String,
      required: true,
      unique: true,
    },

    secretKey: {
      type: String,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

export const ClassFees = new mongoose.model("Class Fess", classFeesShema);

const paymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddStudent",
      required: true,
    },

    classFees: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassFees",
      required: true,
    },

    academicYear: {
      type: String,
      required: true,
    },

    paidAmount: {
      type: Number,
      required: true,
    },

    paidDate: {
      type: Date,
      default: Date.now,
    },

    method: {
      type: String,
      enum: ["Cash", "Bkash", "Bank Transfer", "Nagad"],
      required: true,
    },
  },
  { timestamps: true },
);

export const Payment = new mongoose.model("Payment", paymentSchema);
