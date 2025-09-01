import axios from "axios";

const API = axios.create({
  baseURL: "https://alqemahgoldsmith.com/api",
});

// Token automatically attach karega agar login hua hai
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
