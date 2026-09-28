import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddStudent",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      required: true,
      default: "Absent",
    },

    remark: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Same student same date হলে duplicate আটকাবে
// attendanceSchema.index(
//   { student: 1, date: 1 },
//   { unique: true }
// );

export const Attendance = mongoose.model("Attendance", attendanceSchema);