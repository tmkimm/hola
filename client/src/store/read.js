import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import studyService from 'service/study_service';
import {
  studyOrProjectOption,
  onlineOrOfflineOption,
  languageList,
  recruitsOption,
  contactTypeOption,
  expectedPeriodOption,
  positionsOption,
} from '../common/options';
import { fotmatToReactSelect } from 'common/utils/formatToReactSelect';
/* 

읽고 있는 post 상태를 만드는 redux store 입니다.
post 진입시 해당 내용을 기억하고 있다가, 이탈시 초기화합니다.

*/

const readPostAction = createAction('read/readPost');

const readPost = createAsyncThunk(readPostAction, async (id, thunkAPI) => {
  const { data } = await studyService.getDetail(id);

  return {
    ...data,
    language: fotmatToReactSelect(languageList, data.language),
    expectedPeriod: fotmatToReactSelect(expectedPeriodOption, data.expectedPeriod),
    type: fotmatToReactSelect(studyOrProjectOption, data.type),
    recruits: fotmatToReactSelect(recruitsOption, data.recruits),
    contactPoint: data.contactPoint,
    onlineOrOffline: fotmatToReactSelect(onlineOrOfflineOption, data.onlineOrOffline),
    contactType: fotmatToReactSelect(contactTypeOption, data.contactType),
    positions: fotmatToReactSelect(positionsOption, data.positions),
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
    positions: [],
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
        author: payload.author,
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
        startDate: payload.startDate,
        positions: payload.positions,
      },
    }),
  },
});

export { readPost };
export const { clearPost } = readSlice.actions;
export default readSlice.reducer;
