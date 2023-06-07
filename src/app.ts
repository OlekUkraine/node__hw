import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { ApiError } from "./errors";
import { User } from "./models";
import { IUser } from "./types";
import { UserValidator } from "./validators";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find().select("-password");

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
);

app.get(
  "/users/:userId",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    try {
      const user = await User.findById(req.params.userId);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
);

app.get(
  "/users/gender/:userGender",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find({ gender: req.params.userGender });

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
);

app.post(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        console.log(error);
        throw new ApiError(error.message, 400);
      }
      const createUser = await User.create(value);

      return res.status(201).json(createUser);
    } catch (e) {
      next(e);
    }
  }
);

app.put(
  "/users/:userId",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    try {
      const { userId } = req.params;
      const { error, value } = UserValidator.update.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      const updateUser = await User.findOneAndUpdate(
        { _id: userId },
        { ...value },
        { returnDocument: "after" }
      );

      return res.status(200).json(updateUser);
    } catch (e) {
      next(e);
    }
  }
);

app.delete(
  "/users/:userId",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> => {
    try {
      const { userId } = req.body;
      const deletedUser = await User.deleteOne({ _id: userId });

      return res.json(deletedUser);
    } catch (e) {
      next(e);
    }
  }
);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  return res.status(status).json(error.message);
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  // eslint-disable-next-line no-console
  console.log(`Server has started on PORT ${configs.PORT}`);
});
