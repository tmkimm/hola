import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import studyService from "../service/study_service";

/* 

editor 상태를 관리하는 redux store 입니다.
title은 제목, body는 내용, languages는 사용 언어를 담고 있습니다.

*/
const postRegisterAction = createAction("write/postRegister");

const postRegister = createAsyncThunk(
  postRegisterAction,
  async ({ title, body, tags }, thunkAPI) => {
    const response = await studyService.register({ title, body, tags });
    console.log("response from PostRegisterAPI!", response);
    return { title, body, tags };
  }
);
const initialState = {
  title: "",
  body: "",
  tags: [],
  post: null,
  postError: null,
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
  extraReducers: {
    [postRegister.pending]: (state, { payload }) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [postRegister.fulfilled]: (state, { payload }) => {
      state.post = payload; // post 정보 담음
    },
  },
});

export const { changeField, clearField } = writeSlice.actions;
export { postRegister };
export default writeSlice.reducer;
