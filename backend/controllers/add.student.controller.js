import { AddStudent } from "../models/add.student.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addStudent = async (req, res) => {
  try {
    const {
      fullName,
      studentId,
      rollNumber,
      dob,
      gender,
      className,
      section,
      phone,
      email,
      guardianName,
      guardianPhone,
      address,
      admissionDate,
      previousSchool,
    } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const existingStudent = await AddStudent.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists!" });
    }
    if (phone.length < 11) {
      return res
        .status(400)
        .json({ message: "Your number must be as least 11 digits!" });
    }
    if (guardianPhone.length < 11) {
      return res
        .status(400)
        .json({ message: "Your number must be as least 11 digits!" });
    }
    const user = await AddStudent.create({
      fullName,
      studentId,
      rollNumber,
      dob,
      gender,
      className,
      section,
      phone,
      email,
      guardianName,
      guardianPhone,
      address,
      admissionDate,
      previousSchool,
      image,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.log("ADD STUDENT ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
