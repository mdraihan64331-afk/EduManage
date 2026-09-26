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
      classTeacher
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
      classTeacher,
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

export const editTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(400).json({ message: "Teacher not found!" });
    }

    let image = teacher.image;

    if (req.file) {
      const newImage = await uploadOnCloudinary(req.file.path);

      if (newImage) {
        image = newImage;
      }
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      {
        fullName: req.body.fullName,
        teacherId: req.body.teacherId,
        subject: req.body.subject,
        assignedClass: req.body.assignedClass,
        phone: req.body.phone,
        email: req.body.email,
        joiningDate: req.body.joiningDate,
        teacherRole: req.body.teacherRole,
        gender: req.body.gender,
        aboutTeacher: req.body.aboutTeacher,
        qualification: req.body.qualification,
        classTeacher: req.body.classTeacher,
        image,
      },
      { new: true },
    );

    return res.status(200).json(updatedTeacher);
  } catch (error) {
    console.log("EDIT TEACHER ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(400).json({ message: "Teacher not found!" });
    }

    return res.status(200).json(teacher);
  } catch (error) {
    console.log("GET SINGLE TEACHER ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(400).json({ message: "Teacher not found!" });
    }

    await Teacher.findByIdAndDelete(id);

    return res.status(200).json({ message: "Teacher deleted successfully!" });
  } catch (error) {
    console.log("delete teacher error:", error);
    return res.status(500).json({ message: error.message });
  }
};
