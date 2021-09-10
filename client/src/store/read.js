import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import studyService from "service/study_service";
import languageList from "common/languageList";
/* 

읽고 있는 post 상태를 만드는 redux store 입니다.
post 진입시 해당 내용을 기억하고 있다가, 이탈시 초기화합니다.

*/
const readPostAction = createAction("read/readPost");

const readPost = createAsyncThunk(readPostAction, async (id, thunkAPI) => {
  const response = await studyService.getDetail(id);

  const language = response.data.language.map((obj) => ({
    value: obj,
    label: languageList.find((element) => element.value === obj).label,
  }));
  response.data.language = language;
  return response.data;
});

const initialState = {
  loading: "idle",
  post: {
    id: undefined,
    title: "",
    language: [],
    content: "",
    nickname: "",
    imagePath: "",
    createdAt: "",
    likes: [],
    totalLikes: 0,
    updatedAt: "",
    views: 0,
    isClosed: false,
  },
  error: null,
};

const readSlice = createSlice({
  name: "read",
  initialState,
  reducers: {
    clearPost: (state) => initialState,
  },
  extraReducers: {
    [readPost.fulfilled]: (state, { payload }) => ({
      ...state,
      loading: "success",
      post: {
        id: payload._id,
        title: payload.title,
        language: payload.language,
        content: payload.content,
        nickname: payload.author.nickName,
        imagePath: payload.author.image,
        createdAt: payload.createdAt,
        likes: payload.likes,
        totalLikes: payload.totalLikes,
        updatedAt: payload.updatedAt,
        views: payload.views,
        isClosed: payload.isClosed,
      },
    }),
  },
});

export { readPost };
export const { clearPost } = readSlice.actions;
export default readSlice.reducer;
