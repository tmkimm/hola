import React from 'react';
import * as S from './styled';
import { useGetMainListEvent } from 'domains/eventPage/hooks/useGetMainListEvent';
import { useSelector } from 'react-redux';
import EventItem from '../EventItem';

const ListView = () => {
  const filterState = useSelector((state) => state.itFilter);
  const { data } = useGetMainListEvent(filterState);
  return (
    <S.EventList>
      {data?.map((eventItem, idx) => (
        <S.EventItemContainer>
          <EventItem key={idx} eventInfo={eventItem} />
        </S.EventItemContainer>
      ))}
    </S.EventList>
  );
};

export default ListView;
