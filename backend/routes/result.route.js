import express from "express";
import { addResult, getResult, getResultById } from "../controllers/result.controller.js";

export const resultRouter = express.Router();

resultRouter.post("/add-result", addResult);
resultRouter.get("/get-result", getResult)
resultRouter.get("/get-result-by-id/:id", getResultById)
