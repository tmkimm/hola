import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: [],
  reducers: {
    addLanguage: (state, action) => {
      state.push(action.payload);
    },
    removeLanguage: (state, action) => {
      state.splice(
        state.findIndex((item) => item === action.payload.language),
        1
      );
    },
  },
});

export const { addLanguage, removeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
