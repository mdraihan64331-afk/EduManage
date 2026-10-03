import express from "express";
import { addResult, getResult } from "../controllers/result.controller.js";

export const resultRouter = express.Router();

resultRouter.post("/add-result", addResult);
resultRouter.get("/get-result", getResult)
