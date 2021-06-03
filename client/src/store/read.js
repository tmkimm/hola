import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import studyService from "../service/study_service";
/* 

읽고 있는 post 상태를 만드는 redux store 입니다.
post 진입시 해당 내용을 기억하고 있다가, 이탈시 초기화합니다.

*/
const readPostAction = createAction("read/readPost");

const readPost = createAsyncThunk(readPostAction, async (id, thunkAPI) => {
  const response = await studyService.getDetail(id);
  console.log("response from readPostAPI!", response.data);
  return response.data;
});

const initialState = {
  post: null,
  error: null,
};

const readSlice = createSlice({
  name: "read",
  initialState,
  reducers: {},
  extraReducers: {
    [readPost.fulfilled]: (state, { payload }) => ({
      ...state,
      post: {
        content: payload.content,
        nickname: payload.author.nickName,
        imagePath: payload.author.image,
      },
    }),
  },
});

export { readPost };
export default readSlice.reducer;
