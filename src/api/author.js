import { api } from "../config/axios";

export const addAuthor = async (payload) => {
  try {
    const response = await api.post("/api/author/create", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAllAuthors = async () => {
  try {
    const response = await api.get("/api/author/all");
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAllAuthorsBookCount = async () => {
  try {
    const response = await api.get("/api/author/authors-book");
    return response;
  } catch (error) {
    return error.response;
  }
};
