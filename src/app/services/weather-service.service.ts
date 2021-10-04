import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiKey = 'e8196db56c204c6d844130429210110';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getWeatherFromApi(city: string) {
    return this.httpClient.get(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
  }
}
