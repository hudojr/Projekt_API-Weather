import { Component } from '@angular/core';

import { WeatherRecord } from '../models/weather-record.model';
import { ForecastRecord } from '../models/forecast-record.model';

import { StorageService } from '../api/storage.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  weatherHistory: WeatherRecord[] = []
  forecastHistory: ForecastRecord[] = []

  constructor(private storage: StorageService) { }
  ionViewWillEnter() {
    console.log('Method ionViewWillEnter was called.');
    this.weatherHistory = this.storage.getWeatherRecord();
    this.forecastHistory = this.storage.getForecastRecord();
  }

}