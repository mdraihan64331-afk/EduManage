import express from "express"
import { googleAuth, logOut, signin, signup } from "../controllers/auth.controller.js"

export const authRouter = express.Router()

authRouter.post("/sign-up", signup)
authRouter.post("/sign-in", signin)
authRouter.get("/log-out", logOut)
authRouter.post("/google-auth", googleAuth)