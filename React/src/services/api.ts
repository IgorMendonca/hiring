import axios from 'axios';

export const apiKey = 'P5QHC1ZHEJSJB619'

const api = axios.create({
    baseURL: "https://www.alphavantage.co/query"
});

export default api;