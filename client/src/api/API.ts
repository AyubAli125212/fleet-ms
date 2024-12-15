import axios from "axios";
import { getToken } from "../utils/auth";
import { config } from "@/config";

const API_BASE_URL = config.API_URL || "https://fleet-ms.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL + "/api/v1",
});

api.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    config.withCredentials = false;
    return config;
  },
  (request) => {
    return request;
  }
);

export default api;
