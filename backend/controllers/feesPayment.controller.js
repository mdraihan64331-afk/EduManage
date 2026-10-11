import { ClassFees } from "../models/FeesPayment.model.js";

export const addFees = async (req, res) => {
  try {
    const { className, academicYear, secretKey, totalAmount } = req.body;

    if (secretKey === "eduMange") {
      return res
        .status(400)
        .json({ message: "Please try again! SecterKey not match." });
    }

    const fees = await ClassFees.create({
      className,
      academicYear,
      secretKey,
      totalAmount,
    });

    return res.status(201).json(fees);
  } catch (error) {
    console.log(error);
  }
};
