import express from "express"
import { signin, signup } from "../controllers/auth.controller.js"

export const authRouter = express.Router()

authRouter.post("/sign-up", signup)
authRouter.post("/sign-in", signin)