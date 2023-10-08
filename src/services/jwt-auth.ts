import { Request } from "express";
import { Algorithm, decode, sign } from "jsonwebtoken";
import { readFileSync } from "fs";
import { IAuthServices, Oauth2, UserJWT } from "../types/auth";
import { IUser } from "../models/user";
import uuid from "uuid4";
import { IBaseRepository } from "../types/base-repository";
import { VerifiedCallback } from "passport-jwt";
import ClientError from "../components/error";

export class JwtAuthServices implements IAuthServices {
  constructor(
    private expiresIn: number,
    private userRepository: IBaseRepository<IUser>
  ) {}

  async getOauth2(
    user: IUser,
    algorithm: Algorithm,
    privateKeyFile: string
  ): Promise<Oauth2> {
    const refreshToken = this.getUUID();
    const { lastName, firstName, id, role, username } = user;

    const privateKey = readFileSync(privateKeyFile, "utf8");

    const access_token = this.jwtSign(
      {
        id,
        username,
        firstName,
        lastName,
        role,
      },
      this.expiresIn,
      algorithm,
      privateKey
    );

    await this.userRepository.updateById(id, { refreshToken });

    return {
      access_token,
      refresh_token: refreshToken,
      token_type: "bearer",
      expires_in: this.expiresIn,
    };
  }

  async verify(userJwt: UserJWT): Promise<IUser | null> {
    const { id } = userJwt;
    const user = await this.userRepository.findById(id);
    const isUserDeactivated = !user || !user.refreshToken || !user.activated;
    return isUserDeactivated ? null : user;
  }

  private jwtSign(
    data: UserJWT,
    expiresIn: number,
    algorithm: Algorithm,
    privateKey: string
  ) {
    return sign(data, privateKey, {
      expiresIn,
      algorithm,
    });
  }

  static getUserJWt(accessToken?: string): UserJWT | null {
    if (accessToken) {
      return decode(accessToken.replace(/bearer\s+/i, ""), {
        json: true,
      }) as UserJWT;
    }
    return null;
  }

  private getUUID() {
    return uuid();
  }

  async verifyUser(userJwt: UserJWT, callback: Function) {
    const user = await this.verify(userJwt);
    if (!user) {
      return callback(
        new ClientError(401, "NOT_ACTIVE", "No active token found.", {
          user,
        })
      );
    }
    return callback(null, { ...user, ...userJwt });
  }
}
