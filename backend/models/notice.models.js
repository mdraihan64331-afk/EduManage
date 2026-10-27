import mongoose from "mongoose";

const noticeShema = new mongoose.Schema(
  {
    noticeTitle: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["General", "Academic", "Exam", "Holiday", "Event"],
      required: true,
    },

    priority: {
      type: String,
      enum: ["Normal", "Hight", "Low"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Scheduled"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    files: [
      {
        type: String,
      },
    ],

    publishDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const Notice = new mongoose.model("Notice", noticeShema);
