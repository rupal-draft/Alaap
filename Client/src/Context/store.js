import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import { messengerReducer } from "./Messanger/messagnerReducer";

const store = configureStore({
  reducer: { user: authReducer, messanger: messengerReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
