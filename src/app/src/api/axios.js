import axios from "axios";
const BASE_URL = "http://localhost:3500/api";
const BASE_URL_DOWNLOAD = "http://localhost:3500/uploads";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosDownload = axios.create({
  baseURL: BASE_URL_DOWNLOAD,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
