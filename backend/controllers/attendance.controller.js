import { Attendance } from "../models/attendance.model.js";

export const addAttendance = async (req, res) => {
  try {
    const attendanceData = req.body;

    if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
      return res.status(400).json({
        message: "Attendance data is required",
      });
    }

    const attendance = await Attendance.insertMany(attendanceData);

    res.status(201).json({
      message: "Attendance added successfully",
      attendance,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add attendance",
      error: error.message,
    });
  }
};

// export const editAttendance = async (req, res) => {
//     try {
//         const {id} = req.params

//         const student = await
//     } catch (error) {

//     }

// }
