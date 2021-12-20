import { Component } from '@angular/core';
import { WeatherService } from '../api/weather.service';

import { LoadingController } from '@ionic/angular';
import { HistoryService } from '../api/history.service';


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
  storageName: string
  searchplace: string

  constructor(private weatherService: WeatherService, public loadingController: LoadingController, private storage: HistoryService) {
    this.getStorage();
   }

  //funkcia buttonu na subscribe dat
  public btnGetWeather(): void {

    if (this.place != null) { //ak nie je place null tak sa zavola funkcia loading dialogu, request na pocasie
      this.presentLoading();
      this.weatherService.getWeather(this.place).subscribe((data) => {
        this.succes(data); //ak request je v poriadku predaju sa data vo funkcii succes
        this.setStorage(); //v local storage ulozi hladane vyraz place a subscribe data city a datum
      }, error => {
        this.failed(error);
      }
      );
    }
    else {
      this.noPlace();
    }
  }

  setStorage() {
    this.storage.setString('city', this.place);
    this.storage.setObject('search', {
      mesto: this.city,
      datum: this.date
    });
  }

  getStorage() {
    this.storage.getString('city').then((data: any) => {
      if (data.value) {
        this.place = data.value;
      }
    });
    // this.storage.getObject('person').then((data: any) => {
    //   this.search = data;
    // });
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

  hide(index) {

    if (this.currentDisplayIndex == index) {
      this.currentDisplayIndex = -1; //Reset the index if the current item index is same as the item index passed on button click
      return; //Don't execute further
    }
    this.currentDisplayIndex = index; //Set the current index to the item index passed from template. If you click on item number 3, only 3rd item details will be visible
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
    this.dismiss();
  }

  failed(data) {
    this.temp_C = "";
    this.percento = "";
    this.km_h = "";
    this.ciarka = " ";
    this.temperature = "";
    this.humidity_string = "";
    this.wind = "";
    this.city = data['status'];
    this.country = "";
    this.date = "";
    this.temp = "";
    this.wind_km = "";
    this.humidity = "";
    this.condition = "";
    this.region = data['statusText'];
    this.urlIMG = "assets/icon/400_badrequest.png";
    this.dismiss();
  }

  noPlace() {
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