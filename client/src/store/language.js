import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  "javascript",
  "typescript",
  "react",
  "vue",
  "node.js",
  "java",
  "spring",
  "kotlin",
  "c++",
  "go",
  "python",
  "django",
  "flutter",
  "swift",
];
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    addLanguage: (state, action) => {
      state.push(action.payload);
    },
    removeLanguage: (state, action) => {
      state.splice(
        state.findIndex((item) => item === action.payload),
        1
      );
    },
    clear: () => [],
    init: () => initialState,
  },
});

export const { addLanguage, removeLanguage, clear, init } =
  languageSlice.actions;

export default languageSlice.reducer;
