import { Component } from '@angular/core';
import { WeatherService } from '../api/weather.service';
import { StorageService } from '../services/storage.service';
import { FunctionsService } from '../services/functions.service';
import { ForecastRecord } from '../models/forecast-record.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  place: string
  days: number

  city: string
  region: string
  country: string
  ciarka: string

  forecastdays: any[]

  loadingDialog: any


  constructor(private weatherService: WeatherService, private storage: StorageService, 
    private functions: FunctionsService) {
    this.getFavorite();
  }

  //funkcia pre button
  public btnGetForecast(): void {
    //ak nie je pole(place) pre hladanie prazdne a zaroven je zadany pocet dni tak sa vykona
    if (this.place != null && this.days != null) {
      this.functions.presentLoadingForecast(); //loadingDialog
      //zavola getForecast a subscribe dat z APi
      this.weatherService.getForecast(this.place, this.days).subscribe((data) => {
        //vypis dat
        this.city = data['location']['name'];
        this.region = data['location']['region'];
        this.country = data['location']['country'];
        this.ciarka = ", "
        this.forecastdays = data['forecast']['forecastday'];
        //ulozenie city zo subscribe a vstupu days do record-u
        let record = new ForecastRecord(this.city, this.days);
        //funkcia pre ulozenie pola record do localStorage
        this.saveHistory(record);
        this.functions.dismiss();
      }, (error) => {
        this.functions.dismiss();
      }
      )
    }
  }
  
  //ulozenie oblubeneho mesta a dni, ktore sa budu vzdy ukazovat ako predvolene
  setFavorite() {
    let favorite = new ForecastRecord(this.city, this.days) //zapis do pola
    this.storage.favoriteForecast = favorite; //zapis do storage.favoriteForecast
    this.storage.setObject('favorite_forecast', this.storage.favoriteForecast); //ulozenie do LocalStorage
    this.functions.presentToastForecast(); //zavolanie toast
  }
  //funkcia pre getFavorite, ktora sluzi na volanie oblubenych nastaveni ako place a pocet dni
  getFavorite() {
    this.storage.getObject('favorite_forecast').then((data: any) => {
      if (data != null) {
        this.place = data['city'];
        this.days = data['days'];
      }
    });
  }

  //funkcia pre ulozenie do pola a nasledna aktualizacia localStorage
  saveHistory(record: ForecastRecord) {
    this.storage.forecastHistory.unshift(record);
    this.storage.setObject('forecast_history', this.storage.forecastHistory);
  }


}
