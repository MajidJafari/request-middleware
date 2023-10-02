import { Strategy } from "passport-jwt";
import passport from "passport";
import { App } from "../components/app";
import { Passport } from "../types/passport";

declare module "../components/app" {
	interface App {
		passport: (strategies: Passport.Strategy[]) => App;
	}
}

App.prototype.passport = function(strategies: Passport.Strategy[]) {
	strategies.forEach((strategy) => {
		const { name, options, verification } = strategy;
		passport.use(name, new Strategy(options, verification));
	});

	this.use(passport.initialize());

	return this;
};