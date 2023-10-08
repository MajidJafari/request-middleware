import { GroupRoute } from "../types/routing";
import { listUsers } from "../controllers/user/list";
import { createUser } from "../controllers/user/create";
import "../middleware/authenticate";
import "../middleware/validation";
import Joi from "joi";
import { Router } from "../components/router";
import { loginController } from "../controllers/auth/login";

export const authRoutes: GroupRoute = (router: Router) => {
  return [
    () =>
      router
        .post("/login")
        .validation({
          body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
          },
        })
        .controller(loginController),
  ];
};
