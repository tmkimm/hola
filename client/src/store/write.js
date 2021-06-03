import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import studyService from "../service/study_service";

/* 

editor 상태를 관리하는 redux store 입니다.
title은 제목, content 내용, languages는 사용 언어를 담고 있습니다.

To-do
생성시 글 id 건내주기 api 적용

*/
const writePostAction = createAction("write/writePost");

const writePost = createAsyncThunk(
  writePostAction,
  async ({ title, content, language }, thunkAPI) => {
    const response = await studyService.register({ title, content, language });
    console.log("response from writePostAPI!", response);
    return response.status;
  }
);
const initialState = {
  title: "",
  content: "",
  language: [],
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
    [writePost.pending]: (state, { payload }) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [writePost.fulfilled]: (state, { payload }) => {
      // 수정 필요
      console.log("payload test after registration: ", payload);
      if (payload === 201) {
        state.post = "success";
      }
      state.post = payload; // post 정보 담음
    },
    [writePost.rejected]: (state, { payload }) => {
      console.log("rejected payload~~~~~~~~~~~", payload);
      if (payload === 401) {
        state.postError = "failed"; // post 정보 담음
      }
    },
  },
});

export const { changeField, clearField } = writeSlice.actions;
export { writePost };
export default writeSlice.reducer;
