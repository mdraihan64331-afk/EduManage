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
        url: {
          type: String,
          required: true,
        },
        size: {
          type: Number,
          default: 0,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],

    publishDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
    },

    views: {
      type: Number,
      default: 0,
    },

    viewedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

export const Notice = new mongoose.model("Notice", noticeShema);
