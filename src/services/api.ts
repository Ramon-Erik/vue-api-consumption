import axios from "axios";

export const coinApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins/",
  timeout: 5000,
});
