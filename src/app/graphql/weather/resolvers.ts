import {} from "apollo-server";
import { TResolver } from "../../../types/app";

export const weatherForCitiesResolver: TResolver = async (
  parent,
  args,
  context,
  info
) => {
  const { input } = args;
  const { cityIds } = input;

  const weatherList = await context.repositories.WeatherRepository.getAll({
    city: {
      $in: cityIds,
    },
  });

  return weatherList;
};

export const cityResolver: TResolver = async (parent, args, context, info) => {
  const cityId = parent.city;
  const city = await context.repositories.CityRepository.getById(cityId);
  return city;
};

export default {
  Query: {
    weatherForCities: weatherForCitiesResolver,
  },
  Weather: {
    city: cityResolver,
  },
};
