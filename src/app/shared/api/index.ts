import { config } from "rxjs";
import { environment } from "../../../environments/environment.development";
const serverIp = environment.apiUrl;
export const API = {
    auth: `${serverIp}/auth`,
    registration: `${serverIp}/register`,
    settings:`${serverIp}/settings`,
    tours:`${serverIp}/tours`,
    tour:`${serverIp}/tour`,
    config: `/config/config.json`,
    nearestTours:`${serverIp}/nearestTours`,
}