import express from "express"
import { forgotPassword, googleAuth, logOut, sentOtp, signin, signup, verifyOtp } from "../controllers/auth.controller.js"

export const authRouter = express.Router()

authRouter.post("/sign-up", signup)
authRouter.post("/sign-in", signin)
authRouter.get("/log-out", logOut)
authRouter.post("/google-auth", googleAuth)
authRouter.post("/sent-otp", sentOtp)
authRouter.post("/verify-otp", verifyOtp)
authRouter.post("/forgot-password", forgotPassword)
