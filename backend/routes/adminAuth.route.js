import express from "express";
import {
  adminSignin,
  adminLogout,
  getAdmin,
} from "../controllers/adminAuth.controller.js";
import { isAdminAuth } from "../middlewares/isAdminAuth.js";
import { adminLoginLimiter } from "../middlewares/rateLimit.js";

export const adminAuthRouter = express.Router();

adminAuthRouter.post("/admin-signin", adminLoginLimiter, adminSignin);
adminAuthRouter.post("/admin-logout", adminLogout);

adminAuthRouter.get("/get-admin", isAdminAuth, getAdmin);
