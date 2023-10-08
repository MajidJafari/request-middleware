import { Strategy } from "passport-jwt";
import "./adaptors/error";
import { App } from "./components/app";

const app = new App(7000).express().error();

export default app;
