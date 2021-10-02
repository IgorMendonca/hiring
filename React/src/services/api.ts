import axios from 'axios';

const api = axios.create({
    baseURL: "https://www.alphavantage.co/query"
});

const apitest = axios.create({
  baseURL: "http://localhost:3938"
})

export default apitest;