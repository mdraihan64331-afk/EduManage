import { Attendance } from "../models/attendance.model.js";

export const addAttendance = async (req, res) => {
  try {
    const attendanceData = req.body;

    if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
      return res.status(400).json({
        message: "Attendance data is required",
      });
    }

    const operations = attendanceData.map((attendance) => ({
      updateOne: {
        filter: {
          student: attendance.student,
          date: attendance.date,
        },

        update: {
          $set: {
            status: attendance.status,
            remark: attendance.remark || "",
          },
        },

        upsert: true,
      },
    }));

    const result = await Attendance.bulkWrite(operations);

    res.status(200).json({
      message: "Attendance saved successfully",
      result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to save attendance",
      error: error.message,
    });
  }
};

export const getAllAttencande = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("student");

    res.status(200).json(attendance);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to get attendance",
      error: error.message,
    });
  }
};
