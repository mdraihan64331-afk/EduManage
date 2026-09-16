import bcryptjs from "bcryptjs";
import { User } from "../models/user.models.js";
import { genToken } from "../utils/token.js";

export const signup = async (req, res) => {
  try {
    const {fullName, email, password, role} = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exist." });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "password must be at least 8 characters." });
    }
    const hashPassword = await bcryptjs.hash(password, 12);

    user = await User.create({
      fullName,
      email,
      password: hashPassword,
      role,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json(`sign up error ${error}`);
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User dosen't exist." });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(`sign in error ${error}`);
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token")
    return res.status(200).json({message: "Log out successfully!"})
  } catch (error) {
    return res.status(200).json({message: `Log out error ${error} !`})
  }
}