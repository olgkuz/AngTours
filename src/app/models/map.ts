export interface IWeatherResponce {
    current: IWeatherCurrent,
    hourly: IWeatherHourly,

}
export type WeatherCurrentValue = 0 | 1;

export interface IWeatherCurrent {
    is_day: WeatherCurrentValue,
    rain: WeatherCurrentValue,
    snowfall: WeatherCurrentValue,
}
export interface IWeatherHourly {
    temperature_2m: number[],
}