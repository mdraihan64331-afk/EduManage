import express from "express";
import {
  addTotalClassAndFees,
  getAllClasses,
} from "../controllers/class.controller.js";

export const classesRouter = express.Router();

classesRouter.get("/all-classes", getAllClasses);
classesRouter.post("/add-total-class-room-and-fees", addTotalClassAndFees);
