import { Component } from '@angular/core';

import { WeatherService } from '../api/weather.service';
import { LoadingController } from '@ionic/angular';
import { StorageService } from '../api/storage.service';

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

  forecast = { city: '', days: '' }
  search: any

  constructor(private weatherService: WeatherService, public loadingController: LoadingController, private storage: StorageService) {
    this.getStorage();
  }

  setStorage() {
    this.storage.setObject('forecast', {
      city: this.city,
      days: this.days
    });
  }

  getStorage() {
    this.storage.getObject('forecast').then((data: any) => {
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

  public btnGetForecast(): void {

    if (this.place != null && this.days != null) {
      this.presentLoading();
      this.weatherService.getForecast(this.place, this.days).subscribe((data) => {
        this.city = data['location']['name'];
        this.region = data['location']['region'];
        this.country = data['location']['country'];
        this.ciarka = ", "
        this.forecastdays = data['forecast']['forecastday'];
        this.setStorage();
        this.dismiss();
      }, (error) => {
        this.dismiss();
      }
      )
    }
  }

}
