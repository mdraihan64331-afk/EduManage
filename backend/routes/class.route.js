import express from 'express'
import { addClass, getAllClasses } from '../controllers/class.controller.js'

export const classRouter = express.Router()

classRouter.post("/add-class", addClass)
classRouter.get("/all-classes", getAllClasses);