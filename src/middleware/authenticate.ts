import e from "express";
import passport from "passport";
import { RequestHandler } from "express-serve-static-core";
import { Strategies, UserJWT } from "../types/auth";
import { PassportError } from "../components/error";
import { Router } from "../components/router";

declare module "../components/router" {
  interface Router {
    authenticate: () => Router;
  }
}

export function authenticate(): RequestHandler[] {
  return [
    passport.authenticate(Strategies.User, {
      session: false,
      failWithError: true,
    }),
    (req, res, next) => {
      res.user = req.user as UserJWT;
      next();
    },
    (err: Error, req: e.Request, res: e.Response, next: e.NextFunction) => {
      next(new PassportError());
    },
  ];
}

Router.prototype.authenticate = function () {
  return this.middleware(authenticate);
};
