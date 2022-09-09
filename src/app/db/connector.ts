import mongoose from "mongoose";
import {
  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD,
  MONGO_DB_NAME,
} from "../../config/secrets";

mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

mongoose.set("toObject", {
  virtuals: true,
  versionKey: true,
});

const connection = mongoose.connect(
  `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`
);

export default connection;
