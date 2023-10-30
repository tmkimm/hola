import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { stringify, parse } from 'qs';
import { updateField } from 'store/itFilter';
import DesktopItFilter from './DesktopItFilter';

const makeQueryString = (state) => {
  const { eventType, viewMode, year, month, sort, page, onOffline, search } = state;

  const params = {
    eventType,
    search,
    viewMode,
    ...(viewMode === 'general' ? { sort, page, search, onOffline } : { year, month }),
  };
  return stringify(params, { skipNulls: true });
};

const ItFilterView = ({ isMobile }) => {
  const filterState = useSelector((state) => state.itFilter);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    //NOTE: 첫 마운트시 Url과 전역 State를 Sync합니다.
    dispatch(updateField(parse(window.location.search.substring(1))));
  }, []);

  useEffect(() => {
    history.push({ pathName: '/hola-it', search: makeQueryString(filterState) });
  }, [filterState, history]);

  return isMobile ? <DesktopItFilter /> : <DesktopItFilter />;
};

export default ItFilterView;
