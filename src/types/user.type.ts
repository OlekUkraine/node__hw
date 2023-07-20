import { Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  age?: number;
  gender?: string;
  phone?: string;
  email: string;
  avatar?: string;
  video?: string;
  password: string;
}
