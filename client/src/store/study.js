import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'project',
};

const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    update: (state, action) => ({
      ...state,
      mode: action.payload,
    }),
  },
});

export const { update } = studySlice.actions;
export default studySlice.reducer;
