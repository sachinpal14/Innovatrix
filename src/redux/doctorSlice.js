import { createSlice } from "@reduxjs/toolkit";
import { doctors as demoDoctors } from "../utils/demo.js"; // Assuming doctors data is imported from a demo file

const initialState = {
  doctors: demoDoctors
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {}
});

export default doctorSlice.reducer;
