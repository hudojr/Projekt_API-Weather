import { Component } from '@angular/core';
import { WeatherService } from '../api/weather.service';

import { LoadingController } from '@ionic/angular';
import { StorageService } from '../api/storage.service';


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


  loadingDialog: any
  errors: any

  currentDisplayIndex: number = -1;

  search = { mesto: '', datum: '' }
  lastSearch: any[]

  constructor(private weatherService: WeatherService, public loadingController: LoadingController, private storage: StorageService) {
    this.getStorage();
  }

  //funkcia buttonu na subscribe dat
  public btnGetWeather(): void {
    //ak nie je place null tak sa zavola funkcia loading dialogu, request na pocasie
    this.presentLoading();
    this.weatherService.getWeather(this.place).subscribe((data) => {
      this.succes(data);//ak request je v poriadku predaju sa data vo funkcii succes
      this.dismiss(); 
    }, error => {
      alert("Bad input!")
      this.dismiss();
    }
    );
    this.dismiss();

  }

  setStorage() {
    this.storage.setObject('current', {
      city: this.city,
      date: this.date
    });
  }

  getStorage() {
    this.storage.getObject('current').then((data: any) => {
      this.place = data['city'];
    });
  }

  async presentLoading() {
    this.loadingDialog = await this.loadingController.create(
      {
        message: 'Loading weather.',
      });
    return await this.loadingDialog.present();
  }

  async dismiss() {
    while (await this.loadingController.getTop() !== undefined) {
      await this.loadingController.dismiss();
    }
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