import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Əgər token lazımdırsa (login olanda)
API.interceptors.request.use((config) => {
  // sehife yenilenendede login itmesin
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
