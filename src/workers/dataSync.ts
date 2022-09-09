import { workerData, parentPort } from "worker_threads";
import logger from "../common/logger";
import { sleep } from "../common/utils";
import dbConnector from "../app/db/connector";
// import * as db from "../app/db/models";
import * as repositories from "../app/repositories";
import * as services from "../app/services";
import { TWeatherResponse } from "../app/services/openWeatherMap.service";
import { IWeather } from "../app/db/models/weather.model";

const { interval } = workerData;

async function getCitiesBatch(offset: number = 0, limit = 100) {
  const payload = await repositories.CityRepository.getAll(
    {},
    {
      createdAt: "desc",
    },
    offset,
    limit
  );

  return payload;
}

type TCityData = {
  id: string;
  name: string;
  lat: number;
  lon: number;
};

async function getWeatherDataForCities(cities: TCityData[]) {
  const weatherData = await Promise.all(
    cities.map(async (city) => {
      return services.openWeatherMapService.getWeatherByCoordinates(
        city.lat,
        city.lon
      );
    })
  );

  return weatherData;
}

async function updateCitiesWeatherData(
  cities: TCityData[],
  weatherData: TWeatherResponse[]
) {
  const citiesWeatherData = cities.map((city, index) => {
    const data = weatherData[index];

    return {
      ...data,
      city: city.id,
    };
  });

  return await Promise.all(
    citiesWeatherData.map(async (cityWeatherData) => {
      let weather: IWeather;
      try {
        weather = await repositories.WeatherRepository.updateByCityId(
          cityWeatherData.city,
          {
            $set: cityWeatherData,
          }
        );
      } catch {
        const city = await repositories.CityRepository.getById(
          cityWeatherData.city
        );

        weather = await repositories.WeatherRepository.create({
          ...cityWeatherData,
          city: city,
        });
      }

      return weather;
    })
  );
}

async function main() {
  await dbConnector;

  while (true) {
    let offset = 0;
    const limit = 10;

    while (true) {
      const cities = await getCitiesBatch(offset, limit);

      if (!cities.length) {
        break;
      }

      const weatherData = await getWeatherDataForCities(cities);
      await updateCitiesWeatherData(cities, weatherData);

      offset += limit;
    }

    await sleep(interval);
  }
}

main().catch((err) => {
  logger.error({
    message: "Error in worker",
    data: err,
  });
  process.exit(1);
});
