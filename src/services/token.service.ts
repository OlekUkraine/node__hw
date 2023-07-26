import * as jwt from "jsonwebtoken";

import { configs } from "../configs";
import { EActionTokenTypes, ETokenType } from "../enums";
import { ApiError } from "../errors";
import { ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.LIFETIME_ACCESS_TOKEN,
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: configs.LIFETIME_REFRESH_TOKEN,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(token: string, type: ETokenType): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case ETokenType.Access:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case ETokenType.Refresh:
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public checkActionToken(
    token: string,
    type: EActionTokenTypes,
  ): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case EActionTokenTypes.Forgot:
          secret = configs.JWT_FORGOT_SECRET;
          break;
        case EActionTokenTypes.Activate:
          secret = configs.JWT_ACTIVATE_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public generationActionToken(
    payload: ITokenPayload,
    tokenType: EActionTokenTypes,
  ): string {
    let secret;

    switch (tokenType) {
      case EActionTokenTypes.Forgot:
        secret = configs.JWT_FORGOT_SECRET;
        break;
      case EActionTokenTypes.Activate:
        secret = configs.JWT_ACTIVATE_SECRET;
        break;
    }

    return jwt.sign(payload, secret, {
      expiresIn: configs.LIFETIME_ACTIVATE_TOKEN,
    });
  }
}

export const tokenService = new TokenService();
