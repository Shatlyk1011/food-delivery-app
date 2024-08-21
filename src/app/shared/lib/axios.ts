import axios from "axios";
import { getCookie } from "cookies-next";

import { USER_TOKEN } from "../constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);

const instance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",
});

instance.interceptors.request.use(
  async (config) => {
    // const token = getCookie(USER_TOKEN);

    // if (token) {
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
