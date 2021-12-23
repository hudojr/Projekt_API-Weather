import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

import { WeatherRecord } from '../models/weather-record.model';
import { ForecastRecord } from '../models/forecast-record.model';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    weatherHistory: WeatherRecord[] = []
    forecastHistory: ForecastRecord[] = []
    favoriteRecord: WeatherRecord
    favoriteForecast: ForecastRecord
    favoriteCity: any

    public getWeatherRecord() {
        return this.weatherHistory;
    }

    public getForecastRecord() {
        return this.forecastHistory;
    }

    public getFavoriteRecord() {
        return this.favoriteCity;
    }

    async setObject(key: string, value: any) {
        await Storage.set({ key, value: JSON.stringify(value) });
    }

    async getObject(key: string): Promise<{ value: any }> {
        const ret = await Storage.get({ key });
        return JSON.parse(ret.value);
    }

    async removeItem(key: string) {
        await Storage.remove({ key });
    }

    async clear() {
        await Storage.clear();
    }
}