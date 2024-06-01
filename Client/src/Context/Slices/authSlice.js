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
      
      const user = action.payload.user ? action.payload.user : action.payload;

      state.user = user;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("user", JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.user = null;
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("token");
      }
    },
  },
});


export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
