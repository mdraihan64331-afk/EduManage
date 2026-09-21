import express from "express";
import {
  addStudent,
  editStudent,
  getAllStudents,
  getStudentById,
} from "../controllers/add.student.controller.js";
import upload from "../middlewares/upload.js";

export const studentRoute = express.Router();
studentRoute.post("/add-student", upload.single("profile"), addStudent);
studentRoute.put("/edit-student/:id", upload.single("profile"), editStudent);
studentRoute.get("/student/:id", getStudentById);
studentRoute.get("/all-students", getAllStudents);  
