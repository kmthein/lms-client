import { api } from "../config/axios";

export const addAuthor = async (payload) => {
  try {
    const response = await api.post("/api/author/create", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
