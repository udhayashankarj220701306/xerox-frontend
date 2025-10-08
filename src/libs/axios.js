import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();
console.log("Base URL:", import.meta.env.VITE_BASE_URL_SERVER);
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_SERVER || "http://localhost:5000/api",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
