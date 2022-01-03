export class WeatherRecord 
{
    city: String
    date: String

    constructor(placeHistory: String, dateHistory: String) 
    {
        this.city = placeHistory;
        this.date = dateHistory;
    }
}
