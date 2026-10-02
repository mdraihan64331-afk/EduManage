import mongoose from "mongoose";
import { Result } from "../models/result.model.js";

export const addResult = async (req, res) => {
  try {
    const { student, examType, subject, academicYear, remark } = req.body;

    if (!student || !examType || !subject || !academicYear) {
      return res.status(400).json({
        messange: "student, exam type, subject, academic year are required",
      });
    }

    if (!Array.isArray(subject) || subject.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one sunject is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(student)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    for (const item of subject) {
      if (item.obtainedMark > item.totalMark) {
        return res.status(400).json({
          message: `${item.subject}: Obtained mark cannot be greater than total mark.`,
        });
      }
    }

    const existingResult = await Result.findOne({
      student,
      examType,
      academicYear,
    });

    if (existingResult) {
      return res
        .status(400)
        .json({ message: "Result already exists for this exam." });
    }

    const newResult = await Result.create({
      student,
      examType,
      subject,
      academicYear,
      remark: remark || "",
    });

    const populateResult = await Result.findOne(newResult._id).populate(
      "student",
    );

    return res.status(201).json({ populateResult });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
