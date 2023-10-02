import winston, { Logger } from "winston";

const logger = new (Logger)({
    transports: [
        new (winston.transports.Console)({level: process.env.env === "production" ? "error" : "debug"}),
        new (winston.transports.File)({filename: "debug.log", level: "debug"})
    ]
});

if (process.env.env !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;

