import express from 'express'
import { addStudent, getAllStudents } from '../controllers/add.student.controller.js'
import upload from '../middlewares/upload.js'


export const studentRoute = express.Router()
studentRoute.post("/add-student", upload.single("profile"), addStudent)
studentRoute.get("/all-students", getAllStudents);