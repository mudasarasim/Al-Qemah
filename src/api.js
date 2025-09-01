import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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
