import e from "express";
import passport from "passport";
import { RequestHandler } from "express-serve-static-core";
import { Strategies, UserJWT } from "../types/auth";
import ClientError from "../components/error";
import { Router } from "../components/router";

declare module "../components/router" {
  interface Router {
    authenticate: () => Router;
  }
}

export function authenticate(): RequestHandler[] {
  return [
    passport.authenticate(Strategies.User, { failWithError: true }),
    (req, res, next) => {
      res.user = req.user as UserJWT;
      next();
    },
    (
      err: ClientError,
      req: e.Request,
      res: e.Response,
      next: e.NextFunction
    ) => {
      next(
        new ClientError(
          401,
          "Unauthorized",
          "You are not authorized to do this action. Please sent valid access token.",
          { user: req.user }
        )
      );
    },
  ];
}

Router.prototype.authenticate = function () {
  return this.middleware(authenticate);
};
