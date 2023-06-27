import { Router } from "express";

import { authController } from "../controllers";
import { EActionTokenTypes } from "../enums";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { ICredentials, IUser } from "../types";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.findAndThrow("email"),
  authController.register
);

router.post(
  "/activate/:token",
  authMiddleware.checkActionToken(EActionTokenTypes.Activate),
  authController.activate
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isExist<ICredentials>("email"),
  authController.login
);

router.post(
  "/password/change",
  commonMiddleware.isBodyValid(UserValidator.changePassword),
  authMiddleware.checkAccessToken,
  authController.changePassword
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

router.post(
  "/forgot",
  commonMiddleware.isBodyValid(UserValidator.forgotPassword),
  userMiddleware.isExist<IUser>("email"),
  authController.forgotPassword
);

router.put(
  "/forgot/:token",
  commonMiddleware.isBodyValid(UserValidator.setForgotPassword),
  authMiddleware.checkActionToken(EActionTokenTypes.Forgot),
  authController.setForgotPassword
);

export const authRouter = router;
