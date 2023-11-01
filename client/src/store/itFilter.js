import { createSlice } from '@reduxjs/toolkit';

export const IT_FILTER = {
  TYPE: {
    ALL: 'all',
    CONFERENCE: 'conference',
    HACKATHON: 'hackathon',
    CONTEST: 'contest',
    BOOTCAMP: 'bootcamp',
  },
  VIEW: {
    GENERAL: 'general',
    CALENDAR: 'calendar',
  },
  SORT: {
    RECENT: 'RECENT',
    URGENT: 'TRENDING',
  },
  PLACE: {
    ALL: 'all',
    ONLINE: 'online',
    OFFLINE: 'offline',
    ONOFFLINE: 'onOff',
  },
};

const initialState = {
  eventType: IT_FILTER.TYPE.ALL, // 상단 필터(전체, 컨퍼런스, 해커톤, 공모전, 부트캠프)
  viewMode: IT_FILTER.VIEW.GENERAL, // GENERAL, CALENDAR
  year: new Date().getFullYear(), // calendar에서만 사용
  month: new Date().getMonth(), // calendar에서만 사용
  sort: IT_FILTER.SORT.RECENT,
  onOffline: IT_FILTER.PLACE.ALL,
  page: 1,
  search: null,
};

const itFilterSlice = createSlice({
  name: 'itFilter',
  initialState,
  reducers: {
    changeField: (state, { payload: { key, value } }) => {
      return {
        ...state,
        [key]: value,
        page: 1,
      };
    },
    updateField: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    initFilterState: () => initialState,
  },
});

export const { changeField, updateField, initFilterState } = itFilterSlice.actions;
export default itFilterSlice.reducer;
