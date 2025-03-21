import { environment } from "../../../environments/environment.development";
const serverIp = environment.apiUrl;
export const API = {
    auth: `${serverIp}/auth`,
    registration: `${serverIp}/register`
}