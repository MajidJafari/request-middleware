import { Request, NextFunction, Response } from "express";
import { App } from "../components/app";
import ClientError from "../components/error";

declare module "../components/app" {
  interface App {
    error: () => App;
  }
}

App.prototype.error = function () {
  this.use((req: Request, res: Response, next: NextFunction) => {
    this.throw(
      new ClientError(
        404,
        "PAGE_NOT_FOUND",
        "The page you are looking for does not exist."
      ),
      res
    );
  }).use((err: any, req: Request, res: Response, next: NextFunction) => {
    this.throw(err, res);
  });

  return this;
};
