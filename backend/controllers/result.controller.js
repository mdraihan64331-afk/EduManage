import mongoose from "mongoose";
import { Result } from "../models/result.model.js";

export const addResult = async (req, res) => {
  try {
    const {
      student,
      examType,
      subject,
      academicYear,
      totalMarks,
      totalObtainedMarks,
      averageMark,
      gpa,
      grade,
      resultStatus,
      remark,
    } = req.body;

    console.log("RESULT BODY:", req.body);

    if (!student || !examType || !subject || !academicYear) {
      return res.status(400).json({
        message: "Student, exam type, subject and academic year are required",
      });
    }

    if (!Array.isArray(subject) || subject.length === 0) {
      return res.status(400).json({
        message: "At least one subject is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(student)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    if (!resultStatus) {
      return res.status(400).json({
        message: "Result status is required",
      });
    }

    for (const item of subject) {
      if (Number(item.obtainedMark) > Number(item.totalMark)) {
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
      return res.status(400).json({
        message: "Result already exists for this exam.",
      });
    }

    const newResult = await Result.create({
      student,
      examType,
      subject,
      academicYear,
      totalMarks,
      totalObtainedMarks,
      averageMark,
      gpa,
      grade,
      resultStatus,
      remark: remark || "",
    });

    const populateResult = await Result.findById(newResult._id).populate(
      "student",
    );

    return res.status(201).json({
      message: "Result added successfully",
      result: populateResult,
    });
  } catch (error) {
    console.log("ADD RESULT ERROR:", error);

    return res.status(500).json({
      message: "Failed to add result",
      error: error.message,
    });
  }
};

export const getResult = async (req, res) => {
  try {
    const result = await Result.find().populate("student");

    if (result.length === 0) {
      return res.statue(400).json({ message: "Result is not found!" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getResultById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findById(id).populate("student");

    if (!result) {
      return res.status(400).json({ message: "Result is not found!" });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(`getResultById error ${error}`);
    return res.status(400).json({ message: `getResultById error ${error}` });
  }
};
