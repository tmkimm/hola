import { createSlice } from "@reduxjs/toolkit";

/* 

editor 상태를 관리하는 redux store 입니다.
title은 제목, body는 내용, languages는 사용 언어를 담고 있습니다.

*/
const initialState = {
  title: "",
  body: "",
  languages: [],
};

const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    changeField: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),

    clearField: (state) => initialState,
  },
});

export const { changeField, clearField } = writeSlice.actions;
export default writeSlice.reducer;
