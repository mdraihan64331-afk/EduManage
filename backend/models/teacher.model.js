import mongoose from "mongoose";

const teacherShema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      enum: [
        "Bangle",
        "English",
        "Mathematics",
        "Science",
        "Bangladesh and Global Studies",
        "ICT",
        "Religion and Moral Education",
      ],
      required: true,
    },
    assignedClass: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    image: {
      type: String,
    },
    teacherRole: {
      type: String,
      enum: [
        "Head Teacher",
        "Assistant Teacher",
        "Senior Teacher",
        "Junior Teacher",
        "Accounting Teacher",
      ],
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    aboutTeacher: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Teacher = new mongoose.model("Teacher", teacherShema);
