import axios from 'axios';

export const apiKey = 'P5QHC1ZHEJSJB619'

const api = axios.create({
    baseURL: "https://www.alphavantage.co/query"
});

const apitest = axios.create({
  baseURL: "http://localhost:3938"
})

export default api;