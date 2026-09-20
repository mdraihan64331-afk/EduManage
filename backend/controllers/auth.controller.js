import bcryptjs from "bcryptjs";
import { User } from "../models/user.models.js";
import { genToken } from "../utils/token.js";
import { sentOtpMail } from "../utils/mail.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
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
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(`sign in error ${error}`);
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Log out successfully!" });
  } catch (error) {
    return res.status(200).json({ message: `Log out error ${error} !` });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, role, profileImage } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName,
        email,
        role,
        profileImage,
      });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(`google auth error ${error}`);
  }
};

export const sentOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User dosen't exist." });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sentOtpMail(email, otp);
    return res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    return res.status(400).json(`send otp error ${error}`);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid/Expired OTP." });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "OTP verify successfully." });
  } catch (error) {
    return res.status(400).json(`verify otp error ${error}`);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verification required." });
    }
    const hashPassword = await bcryptjs.hash(newPassword, 12);
    user.password = hashPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Forgot password successfully." });
  } catch (error) {
    return res.status(400).json(`Forgot password error ${error}`);
  }
};
