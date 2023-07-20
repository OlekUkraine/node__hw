import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import multer from "multer";
import { createReadStream } from "streamifier";

import { ApiError } from "../errors";
import { userMapper } from "../mappers";
import { s3Service, userService } from "../services";
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

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const avatar = req.files.avatar as UploadedFile;

      const user = await userService.uploadAvatar(userId, avatar);

      const response = userMapper.toResponse(user);

      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;

      const user = await userService.deleteAvatar(userId);

      const response = userMapper.toResponse(user);
      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async uploadVideo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { userId } = req.params;
      const video = req.files.video as UploadedFile;

      const upload = multer().single("");

      upload(req, res, async (err) => {
        if (err) {
          throw new ApiError("Download error", 500);
        }
        const stream = createReadStream(video.data);

        const pathToVideo = await s3Service.uploadFileStream(
          stream,
          video,
          "video",
          userId
        );
        const user = await userService.uploadVideo(userId, pathToVideo);
        const response = userMapper.toResponse(user);

        return res.status(201).json(response);
      });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
