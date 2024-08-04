import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { messengerReducer } from "./messanger/messagnerReducer";

const store = configureStore({
  reducer: { user: authReducer, messanger: messengerReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
