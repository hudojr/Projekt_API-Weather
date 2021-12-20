import { Component } from '@angular/core';

import { StorageService } from '../api/storage.service';
import { WeatherService } from '../api/weather.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  place: String
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


  constructor(private storage: StorageService, private weatherService: WeatherService) {
    this.getStorage();
   }

  getStorage() {
    this.storage.getObject('current').then((data: any) => {
      this.place = JSON.stringify(data['city']);
    });
  }

  clearStorage() {
    this.storage.clear();
  }


  succes(data) {
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