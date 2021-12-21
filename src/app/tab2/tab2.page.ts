import { Component } from '@angular/core';

import { WeatherService } from '../api/weather.service';
import { LoadingController } from '@ionic/angular';
import { StorageService } from '../api/storage.service';

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


  constructor(private weatherService: WeatherService, public loadingController: LoadingController, private storage: StorageService) {
    this.getFavorite();
  }


  setFavorite() {
    this.storage.setObject('favorite_forecast', {
      city: this.city,
      days: this.days
    });
  }

  getFavorite() {
    this.storage.getObject('favorite_forecast').then((data: any) => {
      this.place = data['city'];
      this.days = data['days'];
    });
  }

  async presentLoading() {
    await this.dismiss();
    this.loadingDialog = await this.loadingController.create(
      {
        message: 'Loading forecast.',
      });
    await this.loadingDialog.present();
  }

  async dismiss() {
    while (await this.loadingController.getTop() !== undefined) {
      await this.loadingController.dismiss();
    }
  }

  async saveHistory(record: ForecastRecord) {
    this.storage.forecastHistory.unshift(record);
    await this.storage.setObject('forecast_history', this.storage.forecastHistory);
  }

  public btnGetForecast(): void {

    if (this.place != null && this.days != null) {
      this.presentLoading();
      this.weatherService.getForecast(this.place, this.days).subscribe((data) => {
        this.city = data['location']['name'];
        this.region = data['location']['region'];
        this.country = data['location']['country'];
        this.ciarka = ", "
        this.forecastdays = data['forecast']['forecastday'];
        let record = new ForecastRecord(this.city,this.days);
        this.saveHistory(record);
        this.dismiss();
      }, (error) => {
        this.dismiss();
      }
      )
    }
  }

}
