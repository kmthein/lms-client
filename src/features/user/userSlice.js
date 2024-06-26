import { createSlice } from "@reduxjs/toolkit";

const prevAccessToken = localStorage.getItem("token") || null;
const prevUser = localStorage.getItem("user");

const initialState = {
  user: JSON.parse(prevUser) || null,
  token: JSON.parse(prevAccessToken),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout: (state) => {
      state.user = {};
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const users = (state) => state.user;

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
