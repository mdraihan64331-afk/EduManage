import express from "express";
import {
  addResult,
  deleteResult,
  EditResult,
  getResult,
  getResultById,
} from "../controllers/result.controller.js";

export const resultRouter = express.Router();

resultRouter.post("/add-result", addResult);
resultRouter.get("/get-result", getResult);
resultRouter.get("/get-result-by-id/:id", getResultById);
resultRouter.put("/edit-result/:id", EditResult);
resultRouter.delete("/delete-result/:id", deleteResult)