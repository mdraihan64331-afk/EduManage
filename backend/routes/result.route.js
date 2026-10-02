import express from "express";
import { addResult } from "../controllers/result.controller.js";

export const resultRouter = express.Router();

resultRouter.post("/add-result", addResult);
