import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";
import { s3Service } from "./s3.service";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return await User.find();
  }
  public async create(data: IUser): Promise<IUser> {
    return await User.create(data);
  }

  public async findById(id: string): Promise<IUser> {
    return await this.getOneByIdOrThrow(id);
  }

  public async findByGender(gender: string): Promise<IUser[]> {
    return await this.getAllByGenderOrThrow(gender);
  }

  public async updateById(id: string, data: Partial<IUser>): Promise<IUser> {
    await this.getOneByIdOrThrow(id);

    return await User.findOneAndUpdate(
      { _id: id },
      { ...data },
      { returnDocument: "after" }
    );
  }

  public async deleteById(id: string): Promise<void> {
    await User.deleteOne({ _id: id });
  }

  public async uploadAvatar(
    userId: string,
    avatar: UploadedFile
  ): Promise<IUser> {
    const user = await this.getOneByIdOrThrow(userId);
    const pathToFile = await s3Service.uploadFile(avatar, "user", userId);

    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }

    return await User.findByIdAndUpdate(
      userId,
      { $set: { avatar: pathToFile } },
      { new: true }
    );
  }

  public async deleteAvatar(userId: string): Promise<IUser> {
    const user = await this.getOneByIdOrThrow(userId);

    if (!user.avatar) {
      return user;
    }

    await s3Service.deleteFile(user.avatar);

    return await User.findByIdAndUpdate(
      userId,
      { $unset: { avatar: true } },
      { new: true }
    );
  }

  public async uploadVideo(userId: string, pathToFile: string): Promise<any> {
    return await User.findByIdAndUpdate(
      userId,
      { $set: { video: pathToFile } },
      { new: true }
    );
  }

  private async getOneByIdOrThrow(userId: string): Promise<IUser> {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError("user not found", 422);
    }
    return user;
  }

  private async getAllByGenderOrThrow(userGender: string): Promise<IUser[]> {
    const users = await User.find({ gender: userGender });

    if (!users) {
      throw new ApiError("gender not find", 422);
    }
    return users;
  }
}

export const userService = new UserService();
