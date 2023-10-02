import { Schema } from "joi";

interface JoiSchema { [key: string]: Schema; }
export interface ValidationSchema {
  body?: JoiSchema;
  query?: JoiSchema;
  params?: JoiSchema;
  headers?: JoiSchema;
}
