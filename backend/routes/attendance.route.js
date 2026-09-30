import express from "express"
import { addAttendance, editAttendance, getAllAttencande } from "../controllers/attendance.controller.js"

export const attendanceRouter = express.Router()

attendanceRouter.post("/add-attendance", addAttendance)
attendanceRouter.get("/get-all-attendance", getAllAttencande)
attendanceRouter.put("/edit-attendance", editAttendance)