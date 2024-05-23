import { createSlice } from "@reduxjs/toolkit";

const getInitialUserState = () => {
  if (typeof window !== "undefined") {
    const user = window.localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const initialState = {
  user: getInitialUserState(),
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("user");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
