import axios from "axios";
import { getCookie } from "cookies-next";

import { TOKEN_ID } from "../constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);

const instance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  method: "GET",
});

instance.interceptors.request.use(
  async (config) => {
    const token = getCookie(TOKEN_ID);
    // const locale = getCookie(LOCALE_ID);

    // config.headers["Accept-Language"] = locale || DEFAULT_LOCALE;
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
