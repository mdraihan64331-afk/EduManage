import express from "express"
import { addTeacher, deleteTeacher, editTeacher, getAllTeachers, getTeacherById } from "../controllers/teacher.controllers.js"
import upload from "../middlewares/upload.js"

export const teacherRouter = express.Router()

teacherRouter.post("/add-teacher", upload.single("profile") ,addTeacher)
teacherRouter.put("/edit-teacher/:id", upload.single("profile") ,editTeacher)
teacherRouter.delete("/delete-teacher/:id", deleteTeacher)
teacherRouter.get("/teacher/:id", getTeacherById)
teacherRouter.get("/all-teacher", getAllTeachers)