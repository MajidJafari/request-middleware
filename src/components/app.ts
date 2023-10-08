import express, {
  Router as ExpressRouter,
  Express,
  Request,
  Response,
} from "express";
import fs from "fs";
import dotenv from "dotenv";

import ClientError, { InternalServerError } from "./error";
import logger from "../util/logger";
import { GroupRoute, RouteProps } from "../types/routing";
import { Router } from "./router";
import { RequestHandlerParams } from "express-serve-static-core";
import { CustomObject } from "../types/global";

export class App {
  readonly expressApp: Express = express();
  config: CustomObject<string | undefined> = {};

  constructor(port: number) {
    this.set("port", port);
    this.initiateConfig();
  }

  get settings(): any {
    return this.expressApp.settings;
  }

  setLocals(locals: object) {
    this.expressApp.locals = locals;
  }

  use(...params: RequestHandlerParams[]) {
    this.expressApp.use(...params);
    return this;
  }

  set(setting: string, val: any) {
    this.expressApp.set(setting, val);
    return this;
  }

  get(key: any) {
    return this.expressApp.get(key);
  }

  getConfig(key: any): any {
    return this.config[key];
  }

  setConfig(key: string, val: any) {
    this.config[key] = val;
  }

  async route(basePath: string, groupRoute: GroupRoute) {
    let getRouters = groupRoute(new Router(this, basePath));
    const expressRouter: ExpressRouter = express.Router();
    getRouters.forEach((getRouter) => {
      const router = getRouter();
      router.route(expressRouter, this);
      this.expressApp.use(basePath, expressRouter);
    });

    return this;
  }

  throw(error: ClientError, res: Response) {
    res.status(error.status || 500);
    logger.error("Error", error);
    res.error = error;
    res.send(error);
  }

  initiateConfig() {
    if (fs.existsSync(".env")) {
      logger.debug("Using .env file to supply config environment variables");
      dotenv.config({ path: ".env" });
    }

    this.config = process.env;
  }
}
