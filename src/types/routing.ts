import e, { RequestHandler } from "express";
import { App } from "../components/app";
import { Router } from "../components/router";
import { Promisified } from "./global";

export enum Methods {
  Get = "get",
  Post = "post",
  Put = "put",
  Delete = "delete",
}

export type GroupRoute = (router: Router) => (() => Router)[];
export interface RouteProps {
  path: string;
  method: Methods;
  middleware: RequestHandler[] | RequestHandler[];
  action: ControllerAction;
}

export type ControllerAction<T = any> = (
  req: e.Request,
  res: e.Response,
  app: App
) => Promisified<T>;
