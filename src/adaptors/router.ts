import { App } from "../components/app";
import { GroupRoute } from "../types/routing";

declare module "../components/app" {
  interface App {
    router: (basePath: string, groupRoute: GroupRoute) => Promise<App>;
  }
}

App.prototype.router = async function (
  this: App,
  basePath: string,
  groupRoute: GroupRoute
) {
  await this.route(basePath, groupRoute);
  return this;
} as any;
