
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

export const isAdminAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Admin login required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.userId);

    if (!admin) {
      return res.status(401).json({
        message: "Admin not found",
      });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({
        message: "Access denied! Admin only.",
      });
    }

    req.adminId = admin._id;

    next();
  } catch (error) {
    console.error("Admin auth error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired admin token",
    });
  }
};
