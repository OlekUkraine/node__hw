import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";

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
