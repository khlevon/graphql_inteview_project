import {
  OPEN_WEATHER_MAP_API_KEY,
} from "../../config/secrets";
import OpenWeatherMapService from "./openWeatherMap.service";


export const openWeatherMapService = new OpenWeatherMapService(OPEN_WEATHER_MAP_API_KEY)
