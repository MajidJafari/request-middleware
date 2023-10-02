import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import logger from "morgan";
import lusca from "lusca";
import { App } from "../components/app";
import "../middlewares/app-middleware/allowOrigin";
import { NextFunction, Request, RequestHandler, Response } from "express";

declare module "../components/app" {
  interface App {
    express: () => App;
  }
}

App.prototype.express = function () {
  const pm_id: any = process.env.pm_id;
  var obj = { [pm_id]: { rc: 0, l: 0 } };
  this.use(compression())
    .use(bodyParser.json())
    .use(lusca.xframe("SAMEORIGIN"))
    .use(lusca.xssProtection(true))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(logger("dev") as RequestHandler)

  return this;
};
