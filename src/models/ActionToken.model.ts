import { model, Schema, Types } from "mongoose";

import { EActionTokenTypes } from "../enums";
import { User } from "./User.model";

const actionTokenSchema = new Schema(
  {
    _userId: {
      type: Types.ObjectId,
      required: true,
      red: User,
    },
    actionToken: {
      type: String,
      required: true,
    },
    tokenType: {
      required: true,
      type: String,
      enum: EActionTokenTypes,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Action = model("Action", actionTokenSchema);
