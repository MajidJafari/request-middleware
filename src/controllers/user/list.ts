import { ControllerAction } from "../../types/routing";

export const listUsers: ControllerAction = (req, res, app) => {
  return app.repositories.userRepository.list();
};
