import express from "express";
import userRouter from "./router/users.js";
import { messagesRouter } from "./router/messages.js";
import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import {createServer} from 'http';
import {Server} from 'socket.io';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:4200',
      credentials: true
    }
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDb();

    app.use("/users", userRouter);
    app.use("/messages", messagesRouter);

    io.on('connection', (socket) => {

    });

    httpServer.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();