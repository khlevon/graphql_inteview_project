import { FilterQuery, ObjectId, SortOrder, UpdateQuery } from "mongoose";
import Weather, { IWeather, TWeather } from "../db/models/weather.model";

class WeatherRepository {
  private constructor() {}

  static async getById(id: string | ObjectId): Promise<IWeather> {
    const weather = await Weather.findById(id);

    if (!weather) {
      throw new Error("Weather not found");
    }

    return weather;
  }

  static async getAll(
    filter: FilterQuery<IWeather> = {},
    sort: { [key: string]: SortOrder | { $meta: "textScore" } } = {},
    offset: number = 0,
    limit: number = 0
  ): Promise<IWeather[]> {
    const cities = await Weather.find(filter)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .exec();

    return cities;
  }

  static async create(weatherData: TWeather): Promise<IWeather> {
    const weather = await Weather.create(weatherData);

    return weather;
  }

  static async update(
    id: string | ObjectId,
    updateQuery: UpdateQuery<IWeather>
  ): Promise<IWeather> {
    const weather = await Weather.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!weather) {
      throw new Error("Weather not found");
    }

    return weather;
  }

  static async updateByCityId(
    cityId: string | ObjectId,
    updateQuery: UpdateQuery<IWeather>
  ): Promise<IWeather> {
    const weather = await Weather.findOneAndUpdate(
      {
        city: cityId,
      },
      updateQuery,
      {
        new: true,
      }
    );

    if (!weather) {
      throw new Error("Weather not found");
    }

    return weather;
  }
}

export default WeatherRepository;
