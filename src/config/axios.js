import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});
