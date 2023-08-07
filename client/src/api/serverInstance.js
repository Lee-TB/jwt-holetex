import axios from "axios";
import { refreshAccessToken } from "./refreshAccessToken";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/constants"

const serverInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach access token before sent request
serverInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// refresh token if response error because access token is expired
serverInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const config = error.config;

    // access token expired
    if (error.response.status === 403) {
      try {
        const accessToken = await refreshAccessToken();
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);

        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        return serverInstance(config);
      } catch (error) {
        // refresh token expired
        if (error.response.status === 403) {
          localStorage.clear();
        }
      }
    }
    return Promise.reject(error);
  }
);

export { serverInstance };
