import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    menus: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addMenus: (state, action) => {
      const existingItemIndex = state.menus.findIndex(
        (item) => item.naziv === action.payload.naziv
      );

      if (existingItemIndex !== -1) {
        state.menus[existingItemIndex].quantity += action.payload.quantity;
        state.total +=
          state.menus[existingItemIndex].cijena * action.payload.quantity;
      } else {
        state.quantity += action.payload.quantity;

        state.menus.push({
          ...action.payload,
          image: { url: action.payload.image.url },
        });
        state.total += action.payload.cijena * action.payload.quantity;
      }
    },
    resetCart: (state) => {
      state.menus = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addMenus, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
