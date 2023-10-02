import { App } from "../components/app";
import { GroupRoute } from "../types/routing";

declare module "../components/app" {
	interface App {
		router: <T extends (App | Promise<App>) = App>(basePath: string, groupRoute: GroupRoute) => T;
	}
}

App.prototype.router = async function(this: App, basePath: string, groupRoute: GroupRoute) {
	await this.route(basePath, groupRoute);
	return this;
} as any;
