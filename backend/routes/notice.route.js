import express from "express";
import upload from "../middlewares/upload.js";
import { addNotice, getAllNotice } from "../controllers/notice.controller.js";

export const noticeRouter = express.Router();

noticeRouter.post("/add-notice", upload.array("files", 5), addNotice);
noticeRouter.get("/get-notice", getAllNotice);
