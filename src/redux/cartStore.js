import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../app/cartRedux";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
