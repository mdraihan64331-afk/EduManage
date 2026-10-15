import mongoose from "mongoose";
import { ClassFees, Payment } from "../models/FeesPayment.model.js";

export const addFees = async (req, res) => {
  try {
    const { className, academicYear, secretKey, totalAmount } = req.body || {};

    if (
      !className ||
      !academicYear ||
      !secretKey ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        message: "Please provide all required fields.",
      });
    }

    if (secretKey !== "eduManage") {
      return res
        .status(400)
        .json({ message: "Please try again! SecterKey not match." });
    }

    if (!Number.isFinite(Number(totalAmount)) || Number(totalAmount) <= 0) {
      return res.status(400).json({
        message: "Please enter a valid total amount.",
      });
    }

    const existingFees = await ClassFees.findOne({
      className,
      academicYear,
    });

    if (existingFees) {
      return res.status(400).json({
        message: `${className} fees of ${academicYear} already exist!`,
      });
    }

    const fees = await ClassFees.create({
      className,
      academicYear,
      secretKey,
      totalAmount: Number(totalAmount),
    });

    return res.status(201).json(fees);
  } catch (error) {
    console.log(error);
  }
};

export const getAllFees = async (req, res) => {
  try {
    const getAllFees = await ClassFees.find();

    return res.status(200).json(getAllFees);
  } catch (error) {
    return res.status(400).json({ message: "Failed to get Fees" });
  }
};

export const AddPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { classFees, academicYear, paidAmount, paidDate, method } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    if (!classFees || !academicYear || !paidAmount || !paidDate || !method) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const amount = Number(paidAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Paid amount must be greater than 0" });
    }

    const fees = await ClassFees.find({ _id: classFees, academicYear });
    if (!fees) {
      return res.status(400).json({ message: "Class fees not found" });
    }

    const payment = await Payment.create({
      student: id,
      classFees: _id,
      academicYear,
      paidAmount: amount,
      paidDate: paidDate || new Date(),
      method,
    });

    return res
      .status(201)
      .json({ message: "Payment add successfully", payment });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to add Payment", error: error.message });
  }
};

export const getAllPayment = async (req, res) => {
  try {
    const getPayment = await Payment.find();

    return res.status(200).json(getPayment);
  } catch (error) {
    console.log(error)
  }
};
