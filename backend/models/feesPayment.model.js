import mongoose from "mongoose";

const feesPaymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddStudent",
      required: true,
    },

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
