import { GroupRoute } from "../types/routing";
import { listUsers } from "../controllers/user/list";
import { createUser } from "../controllers/user/create";
import "../middleware/authenticate";
import "../middleware/validation";
import Joi from "joi";
import { Router } from "../components/router";

export const userRoutes: GroupRoute = (router: Router) => {
  return [
    () => router.get("/").controller(listUsers),

    () =>
      router
        .post("/")
        .authenticate()
        .validation({
          params: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
          },
        })
        .controller(createUser),
  ];
};