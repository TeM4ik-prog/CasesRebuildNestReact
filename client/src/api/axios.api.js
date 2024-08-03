import axios from "axios";
import { getTokenFromLocalStorage } from "../helper/localstorage.helper";


export const instance = axios.create({
    baseURL: '/api',
    headers: {
        Authorization: 'Bearer ' + getTokenFromLocalStorage() || ''
    }
})