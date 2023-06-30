import { createSlice } from "@reduxjs/toolkit";

export const signSlice = createSlice({
  name: "sign",
  initialState: {
    isLogIn: false,
    isDarkMode: false,
    id: null,
  },
  reducers: {
    login: (state) => {
      state.isLogIn = true;
    },
    logout: (state) => {
      state.isLogIn = false;
    },
    clickModeBtn: (state) => {
      let sign = !state.isDarkMode;
      state.isDarkMode = sign;
    },
    setId: (state, action) => {
      const { id } = action.payload;
      state.id = id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, clickModeBtn, setId } = signSlice.actions;
export const selectSign = (state) => state.sign.isLogIn;
export const selectIsDarkMode = (state) => state.sign.isDarkMode;
export const selectId = (state) => state.sign.id;

export default signSlice.reducer;
