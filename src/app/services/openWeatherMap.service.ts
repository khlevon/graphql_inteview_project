import axios from "axios";

export type TWeatherResponse = {
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

export type TCityResponse = {
  name: string;
  lat: number;
  lon: number;
  countryCode: string;
};

class OpenWeatherMapService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.openweathermap.org";
  }

  private async makeRequest(path: string): Promise<any> {
    const url = `${this.baseUrl}${path}&appid=${this.apiKey}`;
    const response = await axios.get(url);
    return response.data;
  }

  public async getCity(city: string): Promise<TCityResponse> {
    const path = `/geo/1.0/direct?q=${city}`;
    const res = await this.makeRequest(path);

    if (!res.length) {
      throw new Error("City not found");
    }

    return {
      name: res[0].name,
      lat: res[0].lat,
      lon: res[0].lon,
      countryCode: res[0].country,
    };
  }

  public async getWeatherByCoordinates(
    lat: number,
    lon: number
  ): Promise<TWeatherResponse> {
    const path = `/data/2.5/weather?lat=${lat}&lon=${lon}`;
    const res = await this.makeRequest(path);

    return {
      temp: res.main.temp,
      feels_like: res.main.feels_like,
      temp_min: res.main.temp_min,
      temp_max: res.main.temp_max,
      pressure: res.main.pressure,
      humidity: res.main.humidity,

      visibility: res.visibility,
      wind_speed: res.wind.speed,
      wind_deg: res.wind.deg,
    };
  }

  public async getWeatherByCity(city: string): Promise<TWeatherResponse> {
    const cityInfo = await this.getCity(city);
    const weather = await this.getWeatherByCoordinates(
      cityInfo.lat,
      cityInfo.lon
    );

    return weather;
  }
}

export default OpenWeatherMapService;
