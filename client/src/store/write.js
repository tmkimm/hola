import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  body: "",
  languages: [],
};
const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    /*
    changeField: (state, payload) => {
      [key] : useDebugValue,
    }
    */
    clear: (state) => initialState,
  },
});

export default writeSlice.reducer;
