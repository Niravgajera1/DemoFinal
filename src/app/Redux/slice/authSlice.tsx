import { createSlice } from "@reduxjs/toolkit";

interface authState {
  isAuthenticate: boolean;
  user: [];
}

const initialState: authState = {
  isAuthenticate: false,
  user: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("login reducer ", action.payload);
      state.isAuthenticate = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticate = false;
      state.user = [];
    },
  },
});

export const { login, logout } = authSlice.actions;

export const isAuthenticated = (state: { auth: authState }) =>
  state.auth.isAuthenticate;
export const user = (state: { auth: authState }) => state.auth.user;

export default authSlice.reducer;
