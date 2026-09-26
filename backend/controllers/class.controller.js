import { Classes } from "../models/class.model.js";

export const addClass = async (req, res) => {
  try {
    const { className, classTeacher } = req.body;

    const classes = await Classes.create({
      className,
      classTeacher,
    });

    res.status(201).json(classes);
  } catch (error) {
    console.log(error);
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Classes.find().populate(
      "classTeacher",
      "_id fullName",
    );

    res.status(200).json(classes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch classes",
    });
  }
};
