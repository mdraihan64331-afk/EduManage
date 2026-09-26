import express from "express";
import { getAllClasses } from "../controllers/class.controller.js";

export const classesRouter = express.Router();

classesRouter.get("/all-classes", getAllClasses);

