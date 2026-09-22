import express from "express"
import { addTeacher, getAllTeachers } from "../controllers/teacher.controllers.js"
import upload from "../middlewares/upload.js"

export const teacherRouter = express.Router()

teacherRouter.post("/add-teacher", upload.single("profile") ,addTeacher)
teacherRouter.get("/all-teacher", getAllTeachers)