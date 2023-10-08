import { Schema } from "joi";
import { SameResultFunction } from "./global";

interface JoiSchema {
  [key: string]: Schema;
}
export interface ValidationSchema {
  body?: JoiSchema;
  query?: JoiSchema;
  params?: JoiSchema;
  headers?: JoiSchema;
}

export interface SanitizationSchema<TB = any, TQ = any, TP = any, TH = any> {
  body?: SameResultFunction<TB>;
  query?: SameResultFunction<TQ>;
  params?: SameResultFunction<TP>;
  headers?: SameResultFunction<TH>;
}
