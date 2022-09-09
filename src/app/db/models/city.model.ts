import mongoose, { Schema, Document } from "mongoose";

export type TCity = {
  name: string;
  countryCode: string;
  lat: number;
  lon: number;
};

export interface ICity extends TCity, Document {
  id: string;
}

const City = mongoose.model<ICity>(
  "City",
  new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
      },
      countryCode: {
        type: String,
        required: true,
        trim: true,
      },
      lat: {
        type: Number,
        required: true,
      },
      lon: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  )
);

export default City;
