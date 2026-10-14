import { ClassFees } from "../models/FeesPayment.model.js";

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
