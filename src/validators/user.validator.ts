import Joi from "joi";

import { regexConstants } from "../constants";
import { EGenders } from "../enums";

export class UserValidator {
  static firstName = Joi.string().min(3).max(30).trim();
  static age = Joi.number().min(1).max(150);
  static gender = Joi.string().valid(...Object.values(EGenders));
  static email = Joi.string().lowercase().regex(regexConstants.EMAIL).trim();
  static password = Joi.string().regex(regexConstants.PASSWORD).trim();

  static create = Joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static update = Joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
  });

  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
