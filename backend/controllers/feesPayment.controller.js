import { FeesPayment } from "../models/feesPayment.model.js";

export const addFeesPayment = async (req, res) => {
  try {
    const { student, feesType, amount, paymentMethod, paymentDate, remark } =
      req.body;

    if (!student) {
      return res.status(400).json({ message: "Student is required!" });
    }

    if (!amount) {
      return res.status(400).json({ message: "amount is required!" });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: "payment method is required!" });
    }

    const addFeesPayment = await FeesPayment.create({
      student,
      feesType,
      amount,
      paymentMethod,
      paymentDate,
      remark,
    });

    return res.status(201).json(addFeesPayment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "payment create faild" });
  }
};

