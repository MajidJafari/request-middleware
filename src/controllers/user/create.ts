import { ControllerAction } from "../../types/routing";
import { UserCreateDTO } from "../../models/dto/create-user.dto";

export const createUser: ControllerAction<
  Omit<UserCreateDTO, "password" | "salt">
> = async (req: { body: UserCreateDTO }, res, app) => {
  await app.repositories.userRepository.save(req.body);
  const { password, ...body } = req.body;

  res.status(201);
  return body;
};
