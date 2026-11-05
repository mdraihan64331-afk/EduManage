import { AddStudent } from "../models/add.student.models.js";
import { Performance } from "../models/performance.model.js";

const calculatePercentage = ({
  classwork,
  homework,
  participation,
  behavior,
  learning,
}) => {
  return (
    ((classwork + homework + participation + behavior + learning) / 50) * 100
  );
};

export const addPerformance = async (req, res) => {
  try {
    const {
      studentId,
      date,
      subject,
      classwork,
      homework,
      participation,
      behavior,
      learning,
      teacherComment,
    } = req.body;

    if (
      !studentId ||
      !date ||
      !subject ||
      [classwork, homework, participation, behavior, learning].some(
        (score) =>
          score === undefined ||
          score === null ||
          score === "" ||
          !Number.isInteger(Number(score)) ||
          Number(score) < 1 ||
          Number(score) > 10,
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide valid student, date, subject and scores (1-10).",
      });
    }

    const parsedDate = new Date(`${date}T00:00:00.000Z`);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== date
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date.",
      });
    }

    const student = await AddStudent.findOne({ studentId });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    const scores = {
      classwork: Number(classwork),
      homework: Number(homework),
      participation: Number(participation),
      behavior: Number(behavior),
      learning: Number(learning),
    };

    const overallPercentage = calculatePercentage(scores);

    const performance = await Performance.create({
      student: student._id,
      date: parsedDate,
      subject: subject.trim(),
      ...scores,
      overallPercentage,
      teacherComment: teacherComment || "",
    });

    const populatedPerformance = await Performance.findById(
      performance._id,
    ).populate("student");

    return res.status(201).json({
      success: true,
      message: "Daily performance saved successfully.",
      performance: populatedPerformance,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Performance already exists for this student, date and subject.",
      });
    }

    console.error("Add Performance Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save performance.",
    });
  }
};

// GET ALL PERFORMANCE
export const getAllPerformance = async (req, res) => {
  try {
    const performances = await Performance.find()
      .populate("student")
      .sort({ date: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      performances,
    });
  } catch (error) {
    console.error("Get Performance Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch performance.",
    });
  }
};

// UPDATE PERFORMANCE
export const updatePerformance = async (req, res) => {
  try {
    const {
      date,
      subject,
      classwork,
      homework,
      participation,
      behavior,
      learning,
      teacherComment,
    } = req.body;

    const scores = {
      classwork,
      homework,
      participation,
      behavior,
      learning,
    };

    for (const score of Object.values(scores)) {
      if (
        score === undefined ||
        score === null ||
        score === "" ||
        !Number.isInteger(Number(score)) ||
        Number(score) < 1 ||
        Number(score) > 10
      ) {
        return res.status(400).json({
          success: false,
          message: "All scores must be integers from 1 to 10.",
        });
      }
    }

    const parsedDate = new Date(`${date}T00:00:00.000Z`);

    if (
      typeof date !== "string" ||
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== date ||
      typeof subject !== "string" ||
      !subject.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid date and subject are required.",
      });
    }

    const normalizedScores = Object.fromEntries(
      Object.entries(scores).map(([key, value]) => [key, Number(value)]),
    );

    const overallPercentage = calculatePercentage(normalizedScores);

    const performance = await Performance.findByIdAndUpdate(
      req.params.id,
      {
        date: parsedDate,
        subject: subject.trim(),
        ...normalizedScores,
        overallPercentage,
        teacherComment: teacherComment || "",
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("student");

    if (!performance) {
      return res.status(404).json({
        success: false,
        message: "Performance record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Performance updated successfully.",
      performance,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Performance already exists for this student, date and subject.",
      });
    }

    console.error("Update Performance Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update performance.",
    });
  }
};

// DELETE PERFORMANCE
export const deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndDelete(req.params.id);

    if (!performance) {
      return res.status(404).json({
        success: false,
        message: "Performance record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Performance deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Performance Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete performance.",
    });
  }
};
