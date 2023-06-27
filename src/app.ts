import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { authRouter, userRouter } from "./routers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((error: any, req: Request, res: Response) => {
  const status = error.status || 500;
  return res.status(status).json(error.message);
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  // eslint-disable-next-line no-console
  console.log(`Server has started on PORT ${configs.PORT}`);
});
