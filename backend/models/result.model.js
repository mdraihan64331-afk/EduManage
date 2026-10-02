import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },

    totalMark: {
      type: Number,
      required: true,
      min: 0,
      default: 100,
    },

    obtainedMark: {
      type: Number,
      required: true,
      min: 0,
    },

    grade: {
      type: String,
      enum: ["A+", "A", "A-", "B", "C", "D", "F"],
    },
  },
  { _id: true },
);

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddStudent",
      required: true,
    },

    examType: {
      type: String,
      enum: [
        "Class Test",
        "Weekly Exam",
        "Monthly Exam",
        "Quiz",
        "Half-Yearly Exam",
        "Annual Exam",
        "Pre-Test Exam",
        "Test Exam",
        "Mid-Term Exam",
        "Final Exam",
        "Practical Exam",
        "Viva Exam",
      ],
      required: true,
    },

    subject: {
      type: [subjectSchema],
      required: true,
    },

    academicYear: {
      type: String,
      required: true,
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    totalObtainedMarks: {
      type: Number,
      required: true,
    },

    averageMark: {
      type: Number,
      required: true,
    },

    gpa: {
      type: Number,
      required: true,
    },

    grade: {
      type: String,
      required: true,
    },

    resultStatus: {
      type: String,
      required: true,
    },

    remark: {
      type: String,
      maxlength: 500,
      trim: true,
      default: "",
    },
  },
  { timestamps: true },
);

resultSchema.index(
  {
    student: 1,
    examType: 1,
    academicYear: 1,
  },
  {
    unique: true,
  },
);

export const Result = new mongoose.model("Result", resultSchema);
