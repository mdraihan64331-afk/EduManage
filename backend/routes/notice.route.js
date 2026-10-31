import express from "express";
import upload from "../middlewares/upload.js";
import {
  addNotice,
  getAllNotice,
  getNoticeById,
  increaseNoticeView,
} from "../controllers/notice.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

export const noticeRouter = express.Router();

noticeRouter.post("/add-notice", upload.array("files", 5), addNotice);
noticeRouter.get("/get-notice", getAllNotice);
noticeRouter.get("/notice/:id", getNoticeById);
noticeRouter.patch("/:id/view", isAuth, increaseNoticeView);
