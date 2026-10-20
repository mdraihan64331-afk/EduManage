import { Admin } from "../models/admin.model.js";

export const getCurrentAdmin = async (req, res) => {
  try {
    const adminId = req.adminId;

    if (!adminId) {
      return res.status(401).json({
        message: "Admin ID not found",
      });
    }

    const admin = await Admin.findById(adminId).select("-password");

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({
      message: `Get current admin error: ${error.message}`,
    });
  }
};