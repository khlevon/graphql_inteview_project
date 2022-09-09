import winston, { Logger } from "winston";
import loggerConfig from "../config/loggerConfig";

const logger: Logger = winston.createLogger(loggerConfig);

export default logger;
