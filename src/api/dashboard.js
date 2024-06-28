import { api } from "../config/axios";

export const getAllCounts = async () => {
  try {
    const response = await api.get("/api/book/all-count");
    return response;
  } catch (error) {
    return error.response;
  }
};
