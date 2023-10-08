import winston, { createLogger } from "winston";

const logger = createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: process.env.env === "production" ? "error" : "debug",
    }),
  ],
});

if (process.env.env !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
