import { Classes, classFees } from "../models/class.model.js";
import { AddStudent } from "../models/add.student.models.js";

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Classes.find().populate(
      "classTeacher",
      "_id fullName image subject",
    );

    const studentCount = await AddStudent.aggregate([
      {
        $group: {
          _id: {
            className: "$className",
            section: "$section",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const result = classes.map((item) => {
      const sections = ["A", "B", "C"].map((section) => {
        const found = studentCount.find(
          (student) =>
            student._id.className === item.className &&
            student._id.section === section,
        );

        return {
          section,
          students: found ? found.count : 0,
        };
      });

      const totalStudents = sections.reduce(
        (total, section) => total + section.students,
        0,
      );

      return {
        ...item.toObject(),
        sections,
        totalStudents,
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log("GET ALL CLASSES ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addTotalClassAndFees = async (req, res) => {
  try {
    const { className, fees, totalClassRoom } = req.body;

    if (fees <= 0) {
      return res.status.json({ message: "Valid amount is required!" });
    }

    if (totalClassRoom <= 0) {
      return res.status.json({ message: "Valid class room is required!" });
    }

    const totalClassRoomAndFees = await classFees.create({
      className,
      fees,
      totalClassRoom,
    });

    return res.status(201).json(totalClassRoomAndFees);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "class Fees creation failed!",
      error: error.message,
    });
  }
};

export const getAllClassRoomAndFees = async (req, res) => {
  try {
    const totalClassRoomAndFees = await classFees.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(totalClassRoomAndFees);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
