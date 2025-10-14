import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import doctorReducer from "./doctorSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    doctor: doctorReducer
  }
});
