import React from 'react';
import * as S from './styled';
import CalendarView from '../CalendarView';
import { useSelector } from 'react-redux';
import { IT_FILTER } from 'store/itFilter';
import ListView from '../ListView';
import ItFilterView from '../ItFilter';

const MainEvents = () => {
  const viewMode = useSelector((state) => state.itFilter.viewMode);

  return (
    <S.Container>
      <ItFilterView />
      {viewMode === IT_FILTER.VIEW.GENERAL ? <ListView /> : <CalendarView />}
    </S.Container>
  );
};

export default MainEvents;
