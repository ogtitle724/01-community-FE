import { createSlice } from "@reduxjs/toolkit";

export const signSlice = createSlice({
  name: "sign",
  initialState: {
    value: false,
  },
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = signSlice.actions;
export const selectSign = (state) => state.sign.value;

export default signSlice.reducer;
