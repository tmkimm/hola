import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortByViews: [],
  sortByRecent: [],
};

const studySlice = createSlice({
  name: "study",
  initialState,
  reducers: {
    update: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    clear: () => ({}),
  },
});

export const { update, clear } = studySlice.actions;
export default studySlice;
