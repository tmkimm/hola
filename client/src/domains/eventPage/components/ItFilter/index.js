import React, { useEffect, useRef } from 'react';
import * as S from './styled';
import { useHistory } from 'react-router';
import CommonSelect from 'domains/main/component/select/select';
import { useDispatch, useSelector } from 'react-redux';
import { stringify, parse } from 'qs';
import { IT_FILTER, changeField, updateField } from 'store/itFilter';
import { filterSortOption, onlineOrOfflineOption } from 'common/options';
import DesktopItFilter from './DesktopItFilter';

const filterList = {
  전체: IT_FILTER.TYPE.ALL,
  해커톤: IT_FILTER.TYPE.HACKATHON,
  컨퍼런스: IT_FILTER.TYPE.CONFERENCE,
  공모전: IT_FILTER.TYPE.CONTEST,
  부트캠프: IT_FILTER.TYPE.BOOTCAMP,
};

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
  const isMounted = useRef(false);
  const filterState = useSelector((state) => state.itFilter);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    //NOTE: 첫 마운트시 url을 sync하지 않습니다.
    if (!isMounted.current) {
      dispatch(updateField(parse(window.location.search.substring(1))));
      isMounted.current = true;
      return;
    }
    history.push({ pathName: '/hola-it', search: makeQueryString(filterState) });
  }, [filterState, history, dispatch]);

  return isMobile ? <DesktopItFilter /> : <DesktopItFilter />;
};

export default ItFilterView;
