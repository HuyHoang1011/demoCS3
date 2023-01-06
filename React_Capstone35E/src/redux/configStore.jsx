import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/productReducer";
import userReducer from "./reducer/userReducer";

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    userReducer: userReducer,
  },
});
