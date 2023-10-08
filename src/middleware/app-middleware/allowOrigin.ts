import { NextFunction, Request, Response, RequestHandler } from "express";
import { App } from "../../components/app";

declare module "../../components/app" {
	interface App {
		allowOrigin: () => RequestHandler;
	}
}

App.prototype.allowOrigin = function() {
	return (req: Request, res: Response, next: NextFunction) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, PATCH, DELETE, OPTIONS"
		);
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		next();
	};
};