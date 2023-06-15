import { NextFunction, Request, Response } from "express";

import { userService } from "../services";
import { IUser } from "../types";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findAll();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const users = await userService.findById(req.params.userId);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const updateUser = await userService.updateById(userId, req.body);

      return res.status(200).json(updateUser);
    } catch (e) {
      next(e);
    }
  }

  public async findByGender(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findByGender(req.params.userGender);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const deletedUser = await userService.deleteById(userId);

      return res.status(204).json(deletedUser);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
