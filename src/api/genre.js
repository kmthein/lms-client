import { api } from "../config/axios";

export const addGenre = async (payload) => {
  try {
    const response = await api.post("/api/genre/create", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
