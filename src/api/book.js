import { api } from "../config/axios";

export const getAllBooks = async () => {
  try {
    const response = await api.get("/api/book/all");
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createBook = async (payload) => {
  try {
    const response = await api.post("/api/book/create", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateBook = async (payload) => {
  try {
    const response = await api.post("/api/book/update", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await api.get(`/api/book/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const userRentBook = async (payload) => {
  try {
    const response = await api.post(`api/rent/create`, payload);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const userReserveBook = async (payload) => {
  try {
    const response = await api.post(`api/reservation/create`, payload);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAllBookReview = async ({ id }) => {
  try {
    const response = await api.get(`api/book/${id}/review`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createNewBookReview = async (payload) => {
  try {
    const response = await api.post(`api/bookreview/create`, payload);
    return response;
  } catch (error) {
    return error.response;
  }
};
