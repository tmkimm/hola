import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subject: '인기', // 상단 필터(인기, 프론트엔드 백엔드...)
  selected: [], // 선택 언어
  position: 'ALL', // 선택 포지션
  search: '', // 검색어
  mode: 'all', // 전체, 프로젝트, 스터디
  isClosed: false, // false일때 모집중인 글만 보기
  isLiked: false, // 북마크 보기 활성화 여부
  page: 1, // 페이지
  onOffLine: 'ALL',
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
      isClosed: action.payload,
      page: 1,
    }),
    changePostMode: (_, action) => ({ ...initialState, isLiked: action.payload }),
    changeField: (state, { payload: { key, value } }) => {
      return {
        ...state,
        [key]: value,
        page: 1,
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
  changeField,
  changePage,
  changePostMode,
} = languageSlice.actions;

export default languageSlice.reducer;
