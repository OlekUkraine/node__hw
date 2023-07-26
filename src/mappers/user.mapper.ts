import { configs } from "../configs";
import { IUser } from "../types";

class UserMapper {
  public toResponse(user: IUser) {
    return {
      _id: user._id ? user._id : null,
      name: user.name ? user.name : null,
      age: user.age ? user.age : null,
      gender: user.gender ? user.gender : null,
      email: user.email ? user.email : null,
      avatar: user.avatar ? `${configs.AWS_S3_URL}/${user.avatar}` : null,
      video: user.video ? `${configs.AWS_S3_URL}/${user.video}` : null,
    };
  }
}

export const userMapper = new UserMapper();
