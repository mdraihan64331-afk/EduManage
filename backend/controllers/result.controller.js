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


export const EditResult = async (req, res) => {
  try {
    const { id } = req.params;

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

    // Validate result ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid result ID",
      });
    }

    const result = await Result.findById(id);

    if (!result) {
      return res.status(404).json({
        message: "Result not found!",
      });
    }

    // Validate student ID
    if (
      student !== undefined &&
      !mongoose.Types.ObjectId.isValid(student)
    ) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    // Validate subjects
    if (subject !== undefined) {
      if (!Array.isArray(subject) || subject.length === 0) {
        return res.status(400).json({
          message: "At least one subject is required",
        });
      }

      for (const item of subject) {
        if (
          Number(item.obtainedMark) > Number(item.totalMark)
        ) {
          return res.status(400).json({
            message: `${item.subject}: Obtained mark cannot be greater than total mark.`,
          });
        }
      }

      result.subject = subject;
    }

    // Check duplicate result
    const checkStudent = student ?? result.student;
    const checkExamType = examType ?? result.examType;
    const checkAcademicYear = academicYear ?? result.academicYear;

    const existingResult = await Result.findOne({
      student: checkStudent,
      examType: checkExamType,
      academicYear: checkAcademicYear,
      _id: { $ne: id },
    });

    if (existingResult) {
      return res.status(400).json({
        message: "Result already exists for this exam.",
      });
    }

    // Update fields
    if (student !== undefined) result.student = student;
    if (examType !== undefined) result.examType = examType;
    if (academicYear !== undefined) {
      result.academicYear = academicYear;
    }

    if (totalMarks !== undefined) result.totalMarks = totalMarks;
    if (totalObtainedMarks !== undefined) {
      result.totalObtainedMarks = totalObtainedMarks;
    }
    if (averageMark !== undefined) result.averageMark = averageMark;
    if (gpa !== undefined) result.gpa = gpa;
    if (grade !== undefined) result.grade = grade;
    if (resultStatus !== undefined) {
      result.resultStatus = resultStatus;
    }
    if (remark !== undefined) result.remark = remark;

    // Save changes to MongoDB
    await result.save();

    const updatedResult = await Result.findById(id).populate("student");

    return res.status(200).json({
      message: "Result updated successfully",
      result: updatedResult,
    });
  } catch (error) {
    console.error("EDIT RESULT ERROR:", error);

    return res.status(500).json({
      message: "Failed to update result",
      error: error.message,
    });
  }
};

