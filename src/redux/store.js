import { configureStore } from "@reduxjs/toolkit";
import signReducer from "./slice/signSlice.js";

export default configureStore({
  reducer: {
    sign: signReducer,
  },
});
