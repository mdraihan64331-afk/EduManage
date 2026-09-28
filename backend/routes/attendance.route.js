import express from "express"
import { addAttendance } from "../controllers/attendance.controller.js"

export const attendanceRouter = express.Router()

attendanceRouter.post("/add-attendance", addAttendance)