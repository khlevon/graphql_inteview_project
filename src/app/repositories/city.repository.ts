import { FilterQuery, ObjectId, SortOrder, UpdateQuery } from "mongoose";
import City, { ICity, TCity } from "../db/models/city.model";

class CityRepository {
  private constructor() {}

  static async getById(id: string | ObjectId): Promise<ICity> {
    const city = await City.findById(id);

    if (!city) {
      throw new Error("City not found");
    }

    return city;
  }

  static async getByName(name: string): Promise<ICity> {
    const city = await City.findOne({
      name,
    });

    if (!city) {
      throw new Error("City not found");
    }

    return city;
  }

  static async getAll(
    filter: FilterQuery<ICity> = {},
    sort: { [key: string]: SortOrder | { $meta: "textScore" } } = {},
    offset: number = 0,
    limit: number = 0
  ): Promise<ICity[]> {
    const cities = await City.find(filter)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .exec();

    return cities;
  }

  static async create(cityData: TCity): Promise<ICity> {
    const city = await City.create(cityData);

    return city;
  }

  static async update(
    id: string | ObjectId,
    updateQuery: UpdateQuery<ICity>
  ): Promise<ICity> {
    const city = await City.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!city) {
      throw new Error("City not found");
    }

    return city;
  }

  static async delete(id: string | ObjectId): Promise<ICity> {
    const city = await City.findByIdAndDelete(id);

    if (!city) {
      throw new Error("City not found");
    }

    return city;
  }

  static async updateByName(
    name: string,
    updateQuery: UpdateQuery<ICity>
  ): Promise<ICity> {
    const city = await City.findOneAndUpdate(
      {
        name,
      },
      updateQuery,
      {
        new: true,
      }
    );

    if (!city) {
      throw new Error("City not found");
    }

    return city;
  }

  static async deleteByName(name: string): Promise<ICity> {
    const city = await City.findOneAndDelete({
      name,
    });

    if (!city) {
      throw new Error("City not found");
    }

    return city;
  }
}

export default CityRepository;
