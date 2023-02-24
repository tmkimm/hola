import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subject: '인기',
  selected: [],
  position: 'ALL',
  search: '',
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
} = languageSlice.actions;

export default languageSlice.reducer;
