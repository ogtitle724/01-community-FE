import { createSlice } from "@reduxjs/toolkit";

export const signSlice = createSlice({
  name: "sign",
  initialState: {
    isLogIn: false,
    isDarkMode: false,
  },
  reducers: {
    login: (state) => {
      state.isLogIn = true;
    },
    logout: (state) => {
      state.isLogIn = false;
    },
    clickModeBtn: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, clickModeBtn } = signSlice.actions;
export const selectSign = (state) => state.sign.isLogIn;
export const selectIsDarkMode = (state) => state.sign.isDarkMode;

export default signSlice.reducer;
