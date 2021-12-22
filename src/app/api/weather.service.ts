import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  API_key = "2fa5ed9900de492abc9184254210312"

  constructor(private http: HttpClient) {

  }

  public getWeather(place: String) {
    return this.http.get('http://api.weatherapi.com/v1/current.json?key=' + this.API_key + '&q=' + place + '&aqi=no');
  }

  public getForecast(place: String, days: number) {
    return this.http.get('http://api.weatherapi.com/v1/forecast.json?key=' + this.API_key + '&q=' + place + '&aqi=no&days=' + days);
  }


}

