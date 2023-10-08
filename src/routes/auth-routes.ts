import { GroupRoute } from "../types/routing";
import { listUsers } from "../controllers/user/list";
import { createUser } from "../controllers/user/create";
import "../middleware/authenticate";
import "../middleware/validation";
import Joi from "joi";
import { Router } from "../components/router";

export const authRoutes: GroupRoute = (router: Router) => {
  return [
    () =>
      router
        .post("/login")
        .validation({
          params: {
            username: Joi.string().required(),
            password: Joi.string().required(),
          },
        })
        .controller(listUsers),
  ];
};
