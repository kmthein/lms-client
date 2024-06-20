import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
  headers: {
    contentType: "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});
