import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connect from "./Config/Connect2DB.js";
import authRouter from "./Routes/AuthRouter.js";
import userRouter from "./Routes/UserRouter.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(morgan("tiny"));
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connect();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.listen(PORT, () => {
  console.log(`Connecting To PORT ${PORT}`);
});
