import { Response } from "express";
import { IUser } from "../../models/user";
import { ControllerAction } from "../../types/routing";

export const createUser: ControllerAction<
  Omit<IUser, "password" | "salt">
> = async (req: { body: IUser }, res, app) => {
  const user = await app.repositories.userRepository.save(req.body);
  const { password, salt, ...body } = user;

  res.status(201);
  return body;
};
