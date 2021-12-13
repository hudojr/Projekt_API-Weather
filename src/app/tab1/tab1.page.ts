import { Component } from '@angular/core';
import { WeatherService } from '../api/weather.service';

import { LoadingController } from '@ionic/angular';
import { error } from 'protractor';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  place: String
  date: String
  city: String
  temp: String
  humidity: String
  urlIMG: String
  region: String
  country: String
  wind_km: String
  km_h:String
  condition:String

  temp_C: String
  temperature:String
  humidity_string
  wind
  percento: String
  ciarka: String


  loadingDialog: any
  errors:any
  

  currentDisplayIndex: number = -1;

  constructor(private weatherService: WeatherService, public loadingController: LoadingController) {
  }
  async presentLoading() {
    await this.dismiss();
    this.loadingDialog = await this.loadingController.create(
      {
        message: 'Loading weather.',
      });
    await this.loadingDialog.present();
  }

  async dismiss() {
    while (await this.loadingController.getTop() !== undefined) {
      await this.loadingController.dismiss();
    }
  }
  

  public btnGetWeatherClicked(): void {

    if (this.place != null) {
      this.presentLoading();
      this.weatherService.getWeather(this.place).subscribe((data) => {
        console.log(data);
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
        this.dismiss();
      },        error => {
        console.log(error);
        this.temp_C = "";
        this.percento = "";
        this.km_h = "";
        this.ciarka = " ";
        this.temperature = "";
        this.humidity_string = "";
        this.wind = "";
        this.city = error['status'];
        this.country = "";
        this.date = "";
        this.temp = "";
        this.wind_km = "";
        this.humidity = "";
        this.condition = "";
        this.region = error['statusText'];
        this.urlIMG = "assets/icon/400_badrequest.png";
        this.dismiss();
    }
      
      );
    }
    else{
      this.temp_C = "";
      this.percento = "";
      this.km_h = "";
      this.ciarka = " ";
      this.temperature = "";
      this.humidity_string = "";
      this.wind = "";
      this.city = "No place to found.";
      this.country = "";
      this.date = "";
      this.temp = "";
      this.wind_km = "";
      this.humidity = "";
      this.region = "";
      this.urlIMG = "";
      this.condition = "";
    }
  }

  hide(index) {

    if (this.currentDisplayIndex == index) {
      this.currentDisplayIndex = -1; //Reset the index if the current item index is same as the item index passed on button click
      return; //Don't execute further
    }
    this.currentDisplayIndex = index; //Set the current index to the item index passed from template. If you click on item number 3, only 3rd item details will be visible
  }

}
