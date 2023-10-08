import { IUser } from "../user";

export type UserCreateDTO = Pick<
  IUser,
  "username" | "firstName" | "lastName" | "password"
>;
