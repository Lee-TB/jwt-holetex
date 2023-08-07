import axios from "axios";

export const authInstance = axios.create({
  baseURL: "http://localhost:5500",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
