import { Response } from "express";
import { IUser } from "../../models/user";
import { ControllerAction } from "../../types/routing";

export const createUser: ControllerAction<Omit<IUser, "password">> = async (
  req: { body: IUser },
  res,
  app
) => {
  await app.repositories.userRepository.save(req.body);
  const { password: _, ...body } = req.body;

  res.status(201);
  return body;
};
