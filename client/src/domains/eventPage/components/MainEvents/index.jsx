import React, { useState } from 'react';
import * as S from './styled';

import CommonSelect from 'domains/main/component/select/select';
import { onlineOrOfflineOption, sortOption } from 'common/options';
import { useGetMainListEvent } from 'domains/eventPage/hooks/useGetMainListEvent';
import EventItem from '../EventItem';
import CalendarView from '../CalendarView';

const MainEvents = () => {
  const { data } = useGetMainListEvent();
  const filterList = ['전체', '해커톤', '컨퍼런스', '공모전', '부트캠프'];
  const [filterState, setFilterState] = useState({
    type: '해커톤',
    onlineOrOffline: 'ALL',
    isLiked: false,
    mode: 'list',
  });

  return (
    <S.Container>
      <S.FilterList>
        {filterList.map((filterItem) => {
          return (
            <S.FilterItem
              key={filterItem}
              $isSelected={filterItem === filterState.type}
              onClick={() => {
                setFilterState((prev) => ({ ...prev, type: filterItem }));
              }}
            >
              {filterItem}
            </S.FilterItem>
          );
        })}
      </S.FilterList>
      <S.SelectContainer>
        <CommonSelect
          options={sortOption}
          placeholder='최신순'
          onChange={(e) => {
            const { value } = e;
            setFilterState((prev) => ({ ...prev, onlineOrOffline: value }));
          }}
        />
        <CommonSelect
          options={onlineOrOfflineOption}
          placeholder='진행방식'
          onChange={(e) => {
            const { value } = e;
            setFilterState((prev) => ({ ...prev, onlineOrOffline: value }));
          }}
        />

        <S.SelectItem selected={filterState.isLiked} onClick={() => {}}>
          👋 관심이벤트
        </S.SelectItem>
        <S.SelectItem
          selected={filterState.mode === 'calendar'}
          onClick={() => {
            setFilterState((prev) => ({
              ...prev,
              mode: prev.mode === 'list' ? 'calendar' : 'list',
            }));
          }}
        >
          🗓️ 캘린더뷰
        </S.SelectItem>
      </S.SelectContainer>
      {filterState.mode === 'list' ? (
        <S.EventList>
          {data?.map((eventItem) => (
            <EventItem key={eventItem.title} eventInfo={eventItem} />
          ))}
        </S.EventList>
      ) : (
        <CalendarView />
      )}
    </S.Container>
  );
};

export default MainEvents;
