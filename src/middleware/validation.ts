import { NextFunction, Request, Response } from "express";
import Joi, { SchemaMap } from "joi";
import { ValidationSchema } from "../types/middleware";
import { Router } from "../components/router";
import ClientError from "../components/error";

function validation(schema: ValidationSchema) {
  const newSchema = Joi.object().keys(schema as SchemaMap);
  return (req: Request, res: Response, next: NextFunction) => {
    const { body, query, params, headers } = schema;
    const result = newSchema.validate(
      {
        body: body ? req.body : undefined,
        query: query ? req.query : undefined,
        params: params ? req.params : undefined,
        headers: headers ? req.headers : undefined,
      },
      {
        abortEarly: false,
        allowUnknown: true,
      }
    );

    result.error
      ? next(
          new ClientError(
            422,
            "VALIDATION_ERROR",
            "One or more fields are not correct.",
            { error: result.error }
          )
        )
      : next();
  };
}

declare module "../components/router" {
  interface Router {
    validation: (schema: ValidationSchema) => Router;
  }
}

export default Router.prototype.validation = function (
  schema: ValidationSchema
) {
  return this.middleware(validation, schema);
};
