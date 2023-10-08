import { Server, createServer } from "http";
import "./adaptors/express";
import "./adaptors/repository";
import "./adaptors/auth";
import "./adaptors/router";
import "./adaptors/error";
import { App } from "./components/app";
import { authRoutes } from "./routes/auth-routes";
import { userRoutes } from "./routes/user-routes";

export const bootstrap = async (port: number, env: string): Promise<Server> => {
  const app = (
    await (
      await new App(port, env)
        .express()
        .initRepositories()
        .auth()
        .router("/auth", authRoutes)
    ).router("/users", userRoutes)
  ).error();

  return createServer(app.expressApp).listen(port, () => {
    console.log(
      "App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
  });
};
