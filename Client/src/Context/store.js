import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";

const store = configureStore({
  reducer: { user: authReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
