import mongoose from "mongoose";

const AddStudentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
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
      ],
      required: true,
    },
    section: {
      type: String,
      enum: ["A", "B", "C"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    guardianName: {
      type: String,
      required: true,
    },
    guardianPhone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    admissionDate: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    previousSchool: {
      type: String,
    },
  },
  { timestamps: true },
);

export const AddStudent = new mongoose.model("AddStudent", AddStudentSchema);
