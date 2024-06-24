import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItem.push(action.payload);
    },
    removeFromCart: (state, action) => {
      console.log(action.payload);
      state.cartItem = state.cartItem.filter(
        (cart) => cart.id !== action.payload
      );
    },
  },
});

export const allCart = (state) => state.cart;

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
