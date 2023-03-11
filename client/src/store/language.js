import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subject: '인기', // 상단 필터(인기, 프론트엔드 백엔드...)
  selected: [], // 선택 언어
  position: 'ALL', // 선택 포지션
  search: '', // 검색어
  mode: 'all', // 전체, 프로젝트, 스터디
  visibleOpenOnly: true,
  page: 1, // 페이지
  previousPage: 0, // 이전페이지
  lastId: '', // 마지막 id
};
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    addLanguage: (state, action) => {
      return {
        ...state,
        selected: [...state.selected, action.payload],
        page: 1,
      };
    },
    removeLanguage: (state, action) => {
      const copy = [...state.selected];
      copy.splice(
        copy.findIndex((item) => item === action.payload),
        1,
      );

      return {
        ...state,
        selected: copy,
        page: 1,
      };
    },
    clearLanguage: (state) => ({ ...state, selected: [], page: 0 }),
    initLanguage: () => initialState,
    changeSubject: (state, action) => ({ ...state, subject: action.payload }),
    changePosition: (state, action) => ({ ...state, position: action.payload, page: 1 }),
    changeSearch: (state, action) => ({ ...state, search: action.payload, page: 1 }),
    changeMode: (state, action) => ({
      ...state,
      mode: action.payload,
      page: 1,
    }),
    changeVisibleOpenOnly: (state, action) => ({
      ...state,
      visibleOpenOnly: action.payload,
      page: 1,
    }),
    changeLastId: (state, action) => ({
      ...state,
      lastId: action.payload,
    }),
    changeField: (state, { payload: { key, value } }) => {
      return {
        ...state,
        [key]: value,
      };
    },
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
  changeLastId,
  changeField,
  changePage,
} = languageSlice.actions;

export default languageSlice.reducer;
