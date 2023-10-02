import ClientError from "../components/error";

export interface CustomObject<T = any> {
	[key: string]: T;
}

declare global {
	namespace Express {
		interface Response {
			response?: any;
			error?: ClientError;
		}
	}
}

