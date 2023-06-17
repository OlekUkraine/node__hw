import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  SECRET_SALT: process.env.SECRET_SALT,

  LIFETIME_ACCESS_TOKEN: process.env.LIFETIME_ACCESS_TOKEN,
  LIFETIME_REFRESH_TOKEN: process.env.LIFETIME_REFRESH_TOKEN,

  NO_REPLY_PASS: process.env.NO_REPLY_PASS,
  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
};
