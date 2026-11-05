import express from "express";
import {
  addPerformance,
  deletePerformance,
  getAllPerformance,
  updatePerformance,
} from "../controllers/performance.controller.js";

export const performanceRouter = express.Router();

performanceRouter.post("/add-performance", addPerformance);
performanceRouter.get("/get-all-performance", getAllPerformance);
performanceRouter.put("/update-performance/:id", updatePerformance);
performanceRouter.delete("/delete-performance/:id", deletePerformance);
