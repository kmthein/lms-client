import { api } from "../config/axios";

export const getAllBook = async () => {
  try {
    const response = await api.get("/api/book/all");
    return response;
  } catch (error) {
    return error.response;
  }
};
