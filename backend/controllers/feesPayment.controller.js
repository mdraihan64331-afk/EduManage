import { FeesPayment } from "../models/feesPayment.model.js";

export const addFeesPayment = async (req, res) => {
  try {
    const { student, feesType, amount, paymentMethod, paymentDate, remark } =
      req.body;

    if (!student) {
      return res.status(400).json({
        message: "Student is required!",
      });
    }

    if (!feesType) {
      return res.status(400).json({
        message: "Fees type is required!",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Valid amount is required!",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        message: "Payment method is required!",
      });
    }

    const newPayment = await FeesPayment.create({
      student,
      feesType,
      amount: Number(amount),
      paymentMethod,
      paymentDate,
      remark,
    });

    return res.status(201).json(newPayment);
  } catch (error) {
    console.log("Payment Create Error:", error);

    return res.status(500).json({
      message: "Payment creation failed!",
      error: error.message,
    });
  }
};

export const getAllPayment = async (req, res) => {
  try {
    const payments = await FeesPayment.find().sort({ createdAt: -1 });

    return res.status(200).json(payments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
