import express from "express";
import { addFeesPayment } from "../controllers/feesPayment.controller.js";

export const feesPaymentRouter = express.Router();

feesPaymentRouter.post("/add-fees-payment", addFeesPayment);
