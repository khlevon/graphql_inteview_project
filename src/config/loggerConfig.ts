import winston, { format } from "winston";
import { LOG_LEVEL, IS_PROD } from "./secrets";

const prodTransports = [];

const devTransport = [
  new winston.transports.Console({
    format: format.combine(
      format.json({
        space: 2,
        replacer: (key, value) => {
          if (value instanceof Buffer) {
            return value.toString("base64");
          } else if (value instanceof Error) {
            var error = {};

            Object.getOwnPropertyNames(value).forEach(function (key) {
              error[key] = value[key];
            });

            return error;
          }

          return value;
        },
      })
    ),
    level: LOG_LEVEL,
  }),
];

const options: winston.LoggerOptions = {
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: IS_PROD ? prodTransports : devTransport,
};

export default options;
