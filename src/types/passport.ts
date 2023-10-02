import { StrategyOptions, VerifyCallback, VerifyCallbackWithRequest } from "passport-jwt";

export declare namespace Passport {
	interface Strategy {
		name: string;
		options: StrategyOptions;
		verification: VerifyCallback | VerifyCallbackWithRequest;
	}
}
