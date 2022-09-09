import {} from "apollo-server";
import logger from "../../../common/logger";
import { TResolver } from "../../../types/app";

/// Query resolvers
export const cityByIdResolver: TResolver = async (parent, args, ctx, info) => {
  const { id } = args;

  return await ctx.repositories.CityRepository.getById(id);
};

export const cityByNameResolver: TResolver = async (
  parent,
  args,
  ctx,
  info
) => {
  const { name } = args;

  return await ctx.repositories.CityRepository.getByName(name);
};

export const citiesResolver: TResolver = async (parent, args, ctx, info) => {
  return await ctx.repositories.CityRepository.getAll();
};

/// Mutation resolvers

export const addCityResolver: TResolver = async (parent, args, ctx, info) => {
  const { name: cityName } = args;
  const {
    name,
    countryCode,
    lat,
    lon,
  } = await ctx.services.openWeatherMapService.getCity(cityName);

  const city = await ctx.repositories.CityRepository.create({
    name,
    countryCode,
    lat,
    lon,
  });

  try {
    const weatherData = await ctx.services.openWeatherMapService.getWeatherByCoordinates(
      city.lat,
      city.lon
    );

    await ctx.repositories.WeatherRepository.create({
      ...weatherData,
      city: city,
    });
  } catch (e) {
    logger.error({
      message: "Error while fetching weather data for city",
      data: e,
    });
  }

  return city;
};

export const removeCityResolver: TResolver = async (
  parent,
  args,
  ctx,
  info
) => {
  const { name } = args;

  const city = await ctx.repositories.CityRepository.deleteByName(name);

  return city;
};

export default {
  Query: {
    cities: citiesResolver,
    cityById: cityByIdResolver,
    cityByName: cityByNameResolver,
  },
  Mutation: {
    addCity: addCityResolver,
    removeCity: removeCityResolver,
  },
};
