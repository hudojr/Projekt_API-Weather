import { Component } from '@angular/core';
import { WeatherService } from '../api/weather.service';
import { StorageService } from '../services/storage.service';
import { WeatherRecord } from '../models/weather-record.model';
import { FunctionsService } from '../services/functions.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  place: string
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


  constructor(private weatherService: WeatherService, private storage: StorageService, 
    private functions: FunctionsService) {
    this.getFavorite(); //pri nacitani Tab1 sa spusti funkcia getFavorite();
  }

  //po otvoreni Tab1 sa spusti funkcia getFavorite();
  ionViewWillEnter() {
    this.getFavorite();
  }

  //funkcia buttonu 
  public btnGetWeather(): void {
    //nacitanie LoadingDialogu
    this.functions.presentLoadingWeather()
    //subscribe dat z requestu, ktory urobila API
    this.weatherService.getWeather(this.place).subscribe((data) => {
      //ak request je v poriadku predaju sa data vo funkcii succes(vypis dat)
      this.succes(data);
      //urobi sa zapis do pola WeatherRecord
      let record = new WeatherRecord(this.city, this.date);
      //urobi sa zapis record-u do pola LocalStorage
      this.saveHistory(record);
      this.functions.dismiss();
    }, error => {
      this.functions.dismiss();
    }
    );
    this.functions.dismiss();
  } 

  //funkcia ktora prida zapis do pola na 1. miesto a toto pole aktualizuje v LocalStorage 
  saveHistory(record: WeatherRecord) {
    this.storage.weatherHistory.unshift(record);
    this.storage.setObject('current_history', this.storage.weatherHistory);
  }

  //funkcia pre zapis oblubenej polohy
  setFavorite() {
    let favorite = new WeatherRecord(this.city, this.date) //zapis v podobe class WeatherRecord
    this.storage.favoriteRecord = favorite; //preda hodnotu do pola storage.favoriteRecord ktora sa nachadza v StorageService
    this.storage.setObject('favorite_current', this.storage.favoriteRecord); //ulozi object do LocalStorage
    this.getFavorite(); //zavola sa getFavorite() pre aktualizaciu oblubeneho mesta v Tab3
    this.functions.presentToastWeather(); //vypis toastu
  }

  //funkcia pre vypis oblubenej polohy do storage.favoriteCity
  getFavorite() {
    this.storage.getObject('favorite_current').then((data: any) => {
      if (data != null) {
        this.storage.favoriteCity = data['city'];
      }
    });
  }

  //funkcia pre vypis dat do .html
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