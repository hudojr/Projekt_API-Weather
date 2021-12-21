export class ForecastRecord 
{
    city: String
    days: number

    constructor(placeHistory: String, dayHistory: number) 
    {
        this.city = placeHistory;
        this.days = dayHistory;
    }
}