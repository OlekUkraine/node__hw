import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Token } from "../models";
import { tokenService } from "../services";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("no token", 401);
      }

      tokenService.checkToken(accessToken);

      const entity = await Token.findOne({ accessToken });
      if (!entity) {
        throw new ApiError("Token not valid", 401);
      }

      // res.locals.tokenInfo = entity;
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const authMiddleware = new AuthMiddleware();
