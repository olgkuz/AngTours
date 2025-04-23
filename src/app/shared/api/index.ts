
import { environment } from "../../../environments/environment.development";
const serverIp = environment.apiUrl;
export const API = {
    auth: `${serverIp}/auth`,
    registration: `${serverIp}/register`,
    tours:`${serverIp}/tours`,
    tour:`${serverIp}/tour`,
    config: `/config/config.json`,
    nearestTours:`${serverIp}/nearestTours`,
    countries:`${serverIp}/countries`,
    countryByCode: 'https://restcountries.com/v3.1/alpha',
    getWhether:"https://api.open-meteo.com/v1/forecast",
    order:`${serverIp}/order`,
    orders: `${serverIp}/orders`, 

}