import { NextFunction, Request, Response } from "express";
import { SanitizationSchema, ValidationSchema } from "../types/middleware";
import { Router } from "../components/router";

function sanitization(schema: SanitizationSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body, query, params, headers } = schema;

    req.body = body ? body(req.body) : req.body;
    req.query = query ? query(req.query) : req.query;
    req.params = params ? params(req.params) : req.params;
    req.headers = headers ? headers(req.headers) : req.headers;

    next();
  };
}

declare module "../components/router" {
  interface Router {
    sanitization: <TB = any, TQ = any, TP = any, TH = any>(
      schema: SanitizationSchema<TB, TQ, TP, TH>
    ) => Router;
  }
}

export default Router.prototype.sanitization = function (
  schema: SanitizationSchema
) {
  return this.middleware(sanitization, schema);
};
