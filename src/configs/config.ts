import { config} from "dotenv";

config();

export const configs = {
      PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,

  FRONT_URL: process.env.FRONT_URL,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,
  JWT_FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,

  SECRET_SALT: process.env.SECRET_SALT,

  LIFETIME_ACCESS_TOKEN: process.env.LIFETIME_ACCESS_TOKEN,
  LIFETIME_REFRESH_TOKEN: process.env.LIFETIME_REFRESH_TOKEN,
  LIFETIME_ACTIVATE_TOKEN: process.env.LIFETIME_ACTIVATE_TOKEN,

  NO_REPLY_PASS: process.env.NO_REPLY_PASS,
  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,

  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_NAME: process.env.AWS_S3_NAME,
  AWS_S3_ACL: process.env.AWS_S3_ACL,
  AWS_S3_URL: process.env.AWS_S3_URL,

  TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_TOKEN: process.env.TWILIO_TOKEN,
};
