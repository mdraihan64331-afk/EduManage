import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
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

  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
});

export const Classes = new mongoose.model("Classes", classSchema);

const classFeesSchema = new mongoose.Schema({
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

  fees: {
    type: Number,
    required: true,
  },

  totalClassRoom: {
    type: Number,
  },
});

export const classFees = new mongoose.model("classFees", classFeesSchema);
