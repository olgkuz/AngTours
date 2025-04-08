export interface IWeatherResponce {
    current: IWeatherCurrent,
    hourly: IweatherHourly

}
export type WeatherCurrentValue = 0 | 1;

export interface IWeatherCurrent {
    is_day:WeatherCurrentValue,
    rain: WeatherCurrentValue,
    snowfall: WeatherCurrentValue,
}
export interface IweatherHourly {
    temperature_2m: number[],
}