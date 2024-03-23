import { stringify } from 'qs';

export const makeQueryString = (state) => {
  const { eventType, viewMode, year, month, sort, page, onOffline, search } = state;

  const params = {
    eventType,
    search,
    viewMode,
    ...(viewMode === 'general'
      ? { sort, page, search, onOffline }
      : { year, month, search, onOffline }),
  };
  return stringify(params, { skipNulls: true });
};
