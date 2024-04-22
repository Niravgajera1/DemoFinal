import { createSlice } from "@reduxjs/toolkit";

interface user {
  id: string;
  name: string;
}

interface authState {
  isAuthenticate: boolean;
  user: user | null;
  userId: string | null;
}

const initialState: authState = {
  isAuthenticate: false,
  user: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("login reducer ", action.payload, ">>>>>>>>>>");
      state.isAuthenticate = true;
      state.user = action.payload;
      state.userId = action.payload?.id;
    },
    logout: (state) => {
      state.isAuthenticate = false;
      state.user = null;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const isAuthenticated = (state: { auth: authState }) =>
  state.auth.isAuthenticate;
export const user = (state: { auth: authState }) => state.auth.user;
export const userId = (state: { auth: authState }) => state.auth.userId;

export default authSlice.reducer;
