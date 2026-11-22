import express from "express";
import { addFeesPayment, getAllPayment } from "../controllers/feesPayment.controller.js";

export const feesPaymentRouter = express.Router();

feesPaymentRouter.post("/add-fees-payment", addFeesPayment);
feesPaymentRouter.get("/all-payments", getAllPayment)