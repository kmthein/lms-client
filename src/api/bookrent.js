import { api } from "../config/axios";

export const getAllBookRent = async () => {
  try {
    const response = await api.get("/api/rent/all");
    return response;
  } catch (error) {
    return error.response;
  }
};
