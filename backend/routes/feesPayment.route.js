import express from "express";
import { addFees, getAllFees } from "../controllers/feesPayment.controller.js";

export const feesPaymentRouter = express.Router();

feesPaymentRouter.post("/add-fees", addFees);
feesPaymentRouter.get("/all-fees", getAllFees);
