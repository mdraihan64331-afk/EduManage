import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { studentRoute } from "./routes/addStudent.route.js";
import { teacherRouter } from "./routes/teacher.route.js";
import { classesRouter } from "./routes/class.route.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/student", studentRoute);
app.use("/api/teacher", teacherRouter);
app.use("/api/classes", classesRouter)

app.listen(port, () => {
  connectDB();
  console.log(`server stated at ${port}...`);
});
