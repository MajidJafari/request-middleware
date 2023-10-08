import ClientError from "../components/error";
import { UserJWT } from "./auth";

export type Promisified<T> = T | Promise<T>;

export interface CustomObject<T = any> {
  [key: string]: T;
}

export type SameResultFunction<T> = (params: T) => T;

declare global {
  namespace Express {
    interface Response {
      user: UserJWT;
      response?: any;
      error?: ClientError;
    }
  }
}
