import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

const passwordSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  { versionKey: false, timestamps: true }
);

export const OldPassword = model("oldPassword", passwordSchema);
