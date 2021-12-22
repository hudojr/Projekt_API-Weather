import { Component } from '@angular/core';

import { WeatherRecord } from '../models/weather-record.model';
import { ForecastRecord } from '../models/forecast-record.model';

import { StorageService } from '../services/storage.service';
import { WeatherService } from '../api/weather.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  weatherHistory: WeatherRecord[] = []
  forecastHistory: ForecastRecord[] = []
  favoriteRecord: WeatherRecord
  fav: any

  date: string
  city: string
  temp: string
  humidity: string
  urlIMG: string
  region: string
  country: string
  wind_km: string
  km_h: string
  condition: string

  temp_C: String
  temperature: String
  humidity_string: String
  wind: String
  percento: String
  ciarka: String

  constructor(private storage: StorageService, private weatherService: WeatherService) {}

  ionViewWillEnter() {
    this.weatherHistory = this.storage.getWeatherRecord();
    this.forecastHistory = this.storage.getForecastRecord();
    this.fav = this.storage.getFavoriteRecord();
    if(this.fav != null){
     this.loadFavoriteWeather();  
    }
  }

  loadFavoriteWeather() {
    //ak nie je place null tak sa zavola funkcia loading dialogu, request na pocasie
    this.weatherService.getWeather(this.fav).subscribe((data) => {
      //ak request je v poriadku predaju sa data vo funkcii succes
      this.loadData(data);

    });
  }

  loadData(data) {
    this.temp_C = " °C";
    this.percento = " %";
    this.km_h = " km/h";
    this.ciarka = ", ";
    this.temperature = "Temperature: ";
    this.humidity_string = "Humidity: ";
    this.wind = "Wind :";
    this.city = data['location']['name'];
    this.region = data['location']['region'];
    this.country = data['location']['country'];
    this.date = data['location']['localtime'];
    this.temp = data['current']['temp_c'];
    this.wind_km = data['current']['wind_kph'];
    this.humidity = data['current']['humidity'];
    this.urlIMG = data['current']['condition']['icon'];
    this.condition = data['current']['condition']['text'];
  }

}