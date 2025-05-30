import axios from "axios";

const API_URL = "/api/graphql";

const instance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",
});

instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
