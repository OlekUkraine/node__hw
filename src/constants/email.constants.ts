import { EEmailActions } from "../enums";

export const allTemplates = {
  [EEmailActions.WELCOME]: {
    templateName: "register",
    subject: "Welcome to our powerful CRUD platform",
  },
  [EEmailActions.COME_BACK]: {
    templateName: "returning-user",
    subject: "Come back to us",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "Forgot password",
  },
};
