import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../app/cartRedux";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userRedux";

const combinedReducers = {
  cart: cartReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
};

const combinedMiddlewares = [...getDefaultMiddleware(), apiSlice.middleware];

export const store = configureStore({
  reducer: combinedReducers,
  middleware: combinedMiddlewares,
  devTools: true,
});

setupListeners(store.dispatch);
