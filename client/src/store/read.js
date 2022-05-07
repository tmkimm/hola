import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import studyService from 'service/study_service';
import {
  studyOrProjectOption,
  onlineOrOfflineOption,
  languageList,
  recruitsOption,
  contactTypeOption,
  expectedPeriodOption,
} from 'common/options';
/* 

읽고 있는 post 상태를 만드는 redux store 입니다.
post 진입시 해당 내용을 기억하고 있다가, 이탈시 초기화합니다.

*/
const getFormattedData = (list, datas) => {
  if (Array.isArray(datas)) {
    return datas.map((data) => ({
      value: data,
      label: list.find((element) => element.value === data).label,
    }));
  } else return { value: datas, label: list.find((element) => element.value === datas).label };
};
const readPostAction = createAction('read/readPost');

const readPost = createAsyncThunk(readPostAction, async (id, thunkAPI) => {
  const { data } = await studyService.getDetail(id);
  console.log(data);
  console.log(getFormattedData(onlineOrOfflineOption, data.onlineOrOffline));
  return {
    ...data,
    language: getFormattedData(languageList, data.language),
    expectedPeriod: getFormattedData(expectedPeriodOption, data.expectedPeriod),
    type: getFormattedData(studyOrProjectOption, data.type),
    recruits: getFormattedData(recruitsOption, data.recruits),
    contactPoint: data.contactPoint,
    onlineOrOffline: getFormattedData(onlineOrOfflineOption, data.onlineOrOffline),
    contactType: getFormattedData(contactTypeOption, data.contactType),
  };
});

const initialState = {
  loading: 'idle',
  post: {
    id: undefined,
    title: '',
    language: [],
    content: '',
    startDate: null,
    type: '',
    recruits: '',
    onlineOrOffline: '',
    contactType: '',
    contactPoint: '',
    expectedPeriod: '',
    nickname: '',
    imagePath: '',
    createdAt: '',
    likes: [],
    totalLikes: 0,
    updatedAt: '',
    views: 0,
    isClosed: false,
  },
  error: null,
};

const readSlice = createSlice({
  name: 'read',
  initialState,
  reducers: {
    clearPost: (state) => initialState,
  },
  extraReducers: {
    [readPost.fulfilled]: (state, { payload }) => ({
      ...state,
      loading: 'success',
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
        expectedPeriod: payload.expectedPeriod,
        contactType: payload.contactType,
        type: payload.type,
        contactPoint: payload.contactPoint,
        onlineOrOffline: payload.onlineOrOffline,
        recruits: payload.recruits,
      },
    }),
  },
});

export { readPost };
export const { clearPost } = readSlice.actions;
export default readSlice.reducer;
