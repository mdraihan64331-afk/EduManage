import express from "express";
import upload from "../middlewares/upload.js";
import { addNotice } from "../controllers/notice.controller.js";

export const noticeRouter = express.Router();

noticeRouter.post("/add-notice", upload.array("files", 5), addNotice);
