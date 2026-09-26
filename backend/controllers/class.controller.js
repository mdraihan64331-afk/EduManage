import { Classes } from "../models/class.model.js";
import { AddStudent } from "../models/add.student.models.js";

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Classes.find().populate(
      "classTeacher",
      "_id fullName image subject"
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
            student._id.section === section
        );

        return {
          section,
          students: found ? found.count : 0,
        };
      });

      const totalStudents = sections.reduce(
        (total, section) => total + section.students,
        0
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