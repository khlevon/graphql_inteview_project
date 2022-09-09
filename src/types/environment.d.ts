export interface ProcessEnv {
  // [key: string]: any;
  NODE_ENV: "development" | "production" | "test" | "staging";
  LOG_LEVEL: string;

  MONGO_DB_HOST: string;
  MONGO_DB_PORT: number;
  MONGO_DB_USERNAME: string;
  MONGO_DB_PASSWORD: string;
  MONGO_DB_NAME: string;

  OPEN_WEATHER_MAP_API_KEY: string;
}
