import axios, { InternalAxiosRequestConfig } from 'axios';
import { getEnvVariables } from '../helpers';
const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({ baseURL: VITE_API_URL });

//Todo: configurar interceptores

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    //const { method, url, } = config;
    // Set Headers Here
    config.headers['x-token'] = localStorage.getItem('token');

    // Check Authentication Here
    // Set Loading Start Here
    //console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

    // if (method === "get") {
    //   config.timeout = 15000;
    // }
    return config;
};

calendarApi.interceptors.request.use(onRequest);

// calendarApi.interceptors.request.use((config: AxiosRequestConfig) => {
//     config.headers = {
//         ...config.headers,
//         'x-token': localStorage.getItem('token')
//     }
//     return config;
// });


export default calendarApi;