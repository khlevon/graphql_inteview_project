import { ProcessEnv } from "../types/environment";
import dotenv from "dotenv";
import path from "path";

export const NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.join(__dirname, "../../", `.env.${NODE_ENV}`),
});

const ENV = (process.env as unknown) as ProcessEnv;

export const IS_PROD = ENV.NODE_ENV === "production";

export const {
  LOG_LEVEL,

  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD,
  MONGO_DB_NAME,

  OPEN_WEATHER_MAP_API_KEY,
} = ENV;
