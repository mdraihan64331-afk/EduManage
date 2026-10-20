import express from "express";
import { isAdminAuth } from "../middlewares/isAdminAuth.js";
import { getCurrentAdmin } from "../controllers/admin.controller.js";

export const adminRouter = express.Router();

adminRouter.get("/current", isAdminAuth, getCurrentAdmin);
