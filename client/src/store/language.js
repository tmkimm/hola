import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subject: '인기', // 상단 필터(인기, 프론트엔드 백엔드...)
  selected: [], // 선택 언어
  position: 'ALL', // 선택 포지션
  search: '', // 검색어
  mode: 'all', // 전체, 프로젝트, 스터디
  visibleOpenOnly: true,
};
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    addLanguage: (state, action) => {
      state.selected.push(action.payload);
    },
    removeLanguage: (state, action) => {
      state.selected.splice(
        state.selected.findIndex((item) => item === action.payload),
        1,
      );
    },
    clearLanguage: (state) => ({ ...state, selected: [] }),
    initLanguage: () => initialState,
    changeSubject: (state, action) => ({ ...state, subject: action.payload }),
    changePosition: (state, action) => ({ ...state, position: action.payload }),
    changeSearch: (state, action) => ({ ...state, search: action.payload }),
    changeMode: (state, action) => ({
      ...state,
      mode: action.payload,
    }),
    changeVisibleOpenOnly: (state, action) => ({
      ...state,
      visibleOpenOnly: action.payload,
    }),
  },
});

export const {
  addLanguage,
  removeLanguage,
  clearLanguage,
  initLanguage,
  changeSubject,
  changePosition,
  changeSearch,
  changeMode,
  changeVisibleOpenOnly,
} = languageSlice.actions;

export default languageSlice.reducer;
