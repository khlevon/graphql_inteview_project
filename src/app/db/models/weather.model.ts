import mongoose, { Schema, Document } from "mongoose";
import { ICity } from "./city.model";

export type TWeather = {
  city: ICity;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
};

export interface IWeather extends TWeather, Document {
  id: string;
}

const Weather = mongoose.model<IWeather>(
  "Weather",
  new Schema(
    {
      city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        required: true,
      },
      temp: {
        type: Number,
        required: true,
      },
      feels_like: {
        type: Number,
        required: true,
      },
      temp_min: {
        type: Number,
        required: true,
      },
      temp_max: {
        type: Number,
        required: true,
      },
      pressure: {
        type: Number,
        required: true,
      },
      humidity: {
        type: Number,
        required: true,
      },
      visibility: {
        type: Number,
        required: true,
      },
      wind_speed: {
        type: Number,
        required: true,
      },
      wind_deg: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  )
);

export default Weather;
