import {
  Router as ExpressRouter,
  Request,
  RequestHandler,
  Response,
} from "express";
import { App } from "./app";
import { ControllerAction, Methods, RouteProps } from "../types/routing";
import { InternalServerError } from "./error";

export class Router {
  private routeProps: RouteProps;
  constructor(
    public app: App,
    protected basePath: string
  ) {
    this.routeProps = {
      path: "",
      method: Methods.Get,
      middleware: [],
      action: () => {},
    };
    return this;
  }

  middleware = (
    middleware: (...params: any[]) => RequestHandler | RequestHandler[],
    ...params: any[]
  ): Router => {
    // @ts-ignore
    this.routeProps.middleware.push(middleware.apply(middleware, params));
    return this;
  };

  controller = (action: ControllerAction) => {
    this.routeProps.action = action;
    Object.seal(this);
    return this;
  };

  get = (path: string): Router => {
    return this.setMethod(Methods.Get, path);
  };

  post = (path: string): Router => {
    return this.setMethod(Methods.Post, path);
  };

  put = (path: string): Router => {
    return this.setMethod(Methods.Put, path);
  };

  delete = (path: string): Router => {
    return this.setMethod(Methods.Delete, path);
  };

  route = (expressRouter: ExpressRouter, app: App) => {
    const { method, path, middleware, action } = this.routeProps;
    expressRouter[method](
      path,
      ...middleware,
      async (req: Request, res: Response) => {
        try {
          res.send({ data: await action(req, res, app) });
        } catch (err: any) {
          if (err.status == 500) {
            app.throw(
              new InternalServerError(
                "FAILED_ACTION_RESPONSE",
                "Couldn't create action response.",
                {
                  path: this.basePath + path,
                  method,
                  body: req.body,
                  params: req.params,
                  query: req.query,
                  error: err,
                }
              ),
              res
            );
          } else {
            app.throw(err, res);
          }
        }
      }
    );
  };

  private setMethod = (method: Methods, path: string): Router => {
    this.routeProps.path = path;
    this.routeProps.method = method;
    return this;
  };
}
