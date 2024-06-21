import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
<<<<<<< HEAD
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
=======
>>>>>>> 7482c5865c7667601cad6940744ee808ec7f2f6f
});
