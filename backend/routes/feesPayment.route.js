import express from "express";
import {
  addFees,
  AddPayment,
  getAllFees,
  getAllPayment,
} from "../controllers/feesPayment.controller.js";

export const feesPaymentRouter = express.Router();

feesPaymentRouter.post("/add-fees", addFees);
feesPaymentRouter.get("/all-fees", getAllFees);
feesPaymentRouter.post("/add-payment/:id", AddPayment);
feesPaymentRouter.get("/all-payment", getAllPayment)
