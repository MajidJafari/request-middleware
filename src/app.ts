import { Strategy } from "passport-jwt";
import "./adaptors/error";
import { App } from "./components/app";

export default new App(7000).express().initRepositories().error();
