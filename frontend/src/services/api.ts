import axios from "axios";

const API = process.env.REACT_APP_BASE_URL;

export const api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});
