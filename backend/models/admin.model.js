import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true },
);

export const Admin = new mongoose.model("Admin", AdminSchema);
