import { GroupRoute } from "../types/routing";
import { listUsers } from "../controllers/user/list";
import { createUser } from "../controllers/user/create";
import "../middleware/authenticate";
import "../middleware/validation";
import "../middleware/sanitization";
import Joi from "joi";
import { Router } from "../components/router";
import { UserCreateDTO } from "../models/dto/create-user.dto";
import { Sanitizer } from "../services/sanitizer";

export const userRoutes: GroupRoute = (router: Router) => {
  return [
    () => router.get("/").authenticate().controller(listUsers),

    () =>
      router
        .post("/")
        .authenticate()
        .validation({
          body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
          },
        })
        .sanitization<UserCreateDTO>({
          body: (body: UserCreateDTO) => {
            const { username, firstName, lastName, password } = body;

            return new Sanitizer(body).sanitize();
          },
        })
        .controller(createUser),
  ];
};
