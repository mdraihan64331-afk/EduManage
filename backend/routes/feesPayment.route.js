import express from "express";
import {
  addFeesPayment,
  getAllPayment,
  getPaymentById,
} from "../controllers/feesPayment.controller.js";

export const feesPaymentRouter = express.Router();

feesPaymentRouter.post("/add-fees-payment", addFeesPayment);
feesPaymentRouter.get("/all-payments", getAllPayment);
feesPaymentRouter.get("/get-payment-by/:id", getPaymentById);
