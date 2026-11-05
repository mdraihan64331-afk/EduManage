import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddStudent",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    classwork: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    homework: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    participation: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    behavior: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    learning: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    overallPercentage: {
      type: Number,
      required: true,
      min: 10,
      max: 100,
    },
    teacherComment: {
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },
  },
  { timestamps: true },
);

performanceSchema.index({ student: 1, date: 1, subject: 1 }, { unique: true });

export const Performance = mongoose.model("Performance", performanceSchema);