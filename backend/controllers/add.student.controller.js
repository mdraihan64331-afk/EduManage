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

export const getAllStudents = async (req, res) => {
  try {
    const students = await AddStudent.find();

    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const editStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await AddStudent.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found!",
      });
    }

    let image = student.image;

    if (req.file) {
      const newImage = await uploadOnCloudinary(req.file.path);

      if (newImage) {
        image = newImage;
      }
    }

    const updatedStudent = await AddStudent.findByIdAndUpdate(
      id,
      {
        fullName: req.body.fullName,
        studentId: req.body.studentId,
        rollNumber: req.body.rollNumber,
        dob: req.body.dob,
        gender: req.body.gender,
        className: req.body.className,
        section: req.body.section,
        phone: req.body.phone,
        email: req.body.email,
        guardianName: req.body.guardianName,
        guardianPhone: req.body.guardianPhone,
        address: req.body.address,
        previousSchool: req.body.previousSchool,
        image: image,
      },
      {
        new: true,
      },
    );

    return res.status(200).json(updatedStudent);
  } catch (error) {
    console.log("EDIT STUDENT ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await AddStudent.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found!",
      });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.log("GET SINGLE STUDENT ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await AddStudent.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found!",
      });
    }

    await AddStudent.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Student deleted successfully!",
    });
  } catch (error) {
    console.log("DELETE STUDENT ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
