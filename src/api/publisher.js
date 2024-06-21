import { api } from "../config/axios";
export const addPublisher = async (payload) => {
  try {
    const response = await api.post("/api/publisher/create", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getPublisherandBook = async () => {
  try {
    const response = await api.get("/api/publisher/publishersandbooks");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
