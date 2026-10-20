import express from "express";
import {
  adminSignin,
  adminLogout,
  getAdmin,
} from "../controllers/adminAuth.controller.js";
import { isAdminAuth } from "../middlewares/isAdminAuth.js";

export const adminAuthRouter = express.Router();

adminAuthRouter.post("/admin-signin", adminSignin);
adminAuthRouter.post("/admin-logout", adminLogout);

adminAuthRouter.get("/get-admin", isAdminAuth, getAdmin);
