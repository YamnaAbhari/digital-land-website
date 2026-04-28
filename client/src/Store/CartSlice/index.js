import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    addToCart: (state, action) => {
      let add = false;
      state.totalPrice += action.payload.attributes.price;
      state.items = state.items.map((pr) => {
        if (pr.id == action.payload.id) {
          pr.cartQuantity++;
          add = true;
        }
        return pr;
      });
      if (!add) {
        state.items.push({ ...action.payload, cartQuantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((pr) => {
        if (pr.id == action.payload) {
          pr.cartQuantity--;
          state.totalPrice -= pr.attributes.price;

          if (pr.cartQuantity == 0) {
            return false;
          }
        }
        return pr;
      });
    },
  },
});
export const {addToCart,clear,removeFromCart}=cartSlice.actions
export default cartSlice.reducer