import axios from "axios";

const api = axios.create({
  baseURL: (process.env.BASE_URL as string) || "http://localhost:3001/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
