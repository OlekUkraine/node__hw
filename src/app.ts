import http from "node:http";

import express, { Request, Response } from "express";
import fileUpload from "express-fileupload";
import * as mongoose from "mongoose";
import socketIO from "socket.io";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { authRouter, userRouter } from "./routers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((error: any, req: Request, res: Response) => {
  const status = error.status || 500;
  return res.status(status).json(error.message);
});

const server = http.createServer(app);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const io = socketIO(server, { cors: { origin: "*" } });

io.on("connection", (socket: any) => {
  console.log(socket);
});

server.listen(configs.PORT, async () => {
  try {
    await mongoose.connect(configs.DB_URL);
    cronRunner();
    // eslint-disable-next-line no-console
    console.log(`Server has started on PORT ${configs.PORT} 👌`);
  } catch (error) {
    console.error(error);
  }
});
