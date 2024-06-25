import { api } from "../config/axios";

export const registerUser = async (payload) => {
  try {
    const response = await api.post("api/user/create", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
