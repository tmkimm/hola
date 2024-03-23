import React from 'react';
import * as S from './styled';
import CalendarView from '../CalendarView';
import { useSelector } from 'react-redux';
import { IT_FILTER } from 'store/itFilter';
import ListView from '../ListView';
import ItFilterView from '../ItFilter';
import { useMediaQuery } from 'react-responsive';

const MainEvents = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const viewMode = useSelector((state) => state.itFilter.viewMode);

  return (
    <S.Container>
      <ItFilterView isMobile={isMobile} />
      {viewMode === IT_FILTER.VIEW.GENERAL ? <ListView /> : <CalendarView />}
    </S.Container>
  );
};

export default MainEvents;
