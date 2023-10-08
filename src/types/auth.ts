import { VerifyCallback } from "passport-jwt";
import { IUser } from "../models/user";
import { Roles } from "./models";

export interface IAuthServices {
  verifyUser: VerifyCallback;
}

export interface Oauth2 {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface UserJWT
  extends Omit<IUser, "password" | "refreshToken" | "activated"> {
  id: number | string;
  username: string;
  firstName: string;
  lastName: string;
  role: Roles;
  exp?: number;
  iat?: number;
}

export enum Strategies {
  User = "user",
}
