import { Teacher } from "../models/teacher.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addTeacher = async (req, res) => {
  try {
    const {
      fullName,
      teacherId,
      subject,
      assignedClass,
      phone,
      email,
      joiningDate,
      teacherRole,
      gender,
      aboutTeacher,
      qualification,
    } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher Already exists!" });
    }

    if (phone.length < 11) {
      return res
        .status(400)
        .json({ message: "Your number must be at least 11 digits!" });
    }

    const teacher = await Teacher.create({
      fullName,
      teacherId,
      subject,
      assignedClass,
      phone,
      email,
      joiningDate,
      teacherRole,
      gender,
      aboutTeacher,
      qualification,
      image,
    });

    return res.status(201).json(teacher);
  } catch (error) {
    console.log(error);
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teacher = await Teacher.find();

    return res.status(200).json(teacher);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
