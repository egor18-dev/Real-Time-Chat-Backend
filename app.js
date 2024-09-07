import express from "express";
import userRouter from "./router/users.js";
import { messagesRouter } from "./router/messages.js";
import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

const PORT = process.env.PORT || 3000;
console.log(PORT)
const startServer = async () => {
  try {
    await connectDb();

    app.use("/users", userRouter);
    app.use("/messages", messagesRouter);

    app.listen(PORT, () => {
      console.log(`Server running at PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();