import axios from "axios";
import { getCookie } from "cookies-next";

import { USER_INFO } from "../constants";

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
    const token = getCookie(USER_INFO);
    // const locale = getCookie(LOCALE_ID);

    // config.headers["Accept-Language"] = locale || DEFAULT_LOCALE;

    config.headers["Content-Type"] = "application/json";
    if (token) {
      // config.headers.Authorization = `JWT ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
