// Centralized Axios instance used across pages to talk to the backend API.
// The base URL can be overridden with VITE_API_URL in a .env file.
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export default api;

