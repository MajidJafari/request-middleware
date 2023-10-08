import "./adaptors/error";
import { App } from "./components/app";
import { authRoutes } from "./routes/auth-routes";
import { userRoutes } from "./routes/user-routes";

export default new App(7000)
  .express()
  .initRepositories()
  .auth()
  .router("/auth", authRoutes)
  .router("/users", userRoutes)
  .error();
