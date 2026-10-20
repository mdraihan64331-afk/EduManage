import bcrypt from "bcryptjs";
import { Admin } from "../models/admin.model.js";
import { genToken } from "../utils/token.js";

export const adminSignin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    if (fullName !== process.env.ADMIN_SIGNIN_NAME) {
      return res.status(401).json({ message: "Enter the correct full name" });
    }

    if (email !== process.env.ADMIN_SIGNIN_EMAIL) {
      return res.status(401).json({
        message: "Enter the correct email",
      });
    }

    if (password !== process.env.ADMIN_SIGNIN_PASSWORD) {
      return res.status(401).json({
        message: "Invalid admin password",
      });
    }

    let admin = await Admin.findOne({ email });

    if (!admin) {
      if (!fullName) {
        return res.status(400).json({
          message: "Full name is required for initial admin setup",
        });
      }

      const hashPassword = await bcrypt.hash(password, 12);

      admin = await Admin.create({
        fullName,
        email,
        password: hashPassword,
      });
    }

    const token = await genToken(admin._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Admin login successful",
      admin: {
        _id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin signin error:", error);

    return res.status(500).json({
      message: "Admin signin failed",
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logout successful!",
    });
  } catch (error) {
    console.error("Admin logout error:", error);

    return res.status(500).json({
      message: "Logout failed!",
    });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    return res.status(200).json({ admin });
  } catch (error) {
    console.error("Get admin error:", error);

    return res.status(500).json({
      message: "Failed to get admin",
    });
  }
};
