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

    public getWeatherRecord() {
        console.log(this.weatherHistory);
        return this.weatherHistory;
        
    }

    public getForecastRecord() {
        console.log(this.forecastHistory);
        
        return this.forecastHistory;
    }

    async setString(key: string, value: string) {
        await Storage.set({ key, value });
    }

    async getString(key: string): Promise<{ value: any }> {
        return (await Storage.get({ key }));
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