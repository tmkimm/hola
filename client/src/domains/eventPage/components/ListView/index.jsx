import React, { useEffect, useRef } from 'react';
import * as S from './styled';
import { useSelector } from 'react-redux';
import EventItem from '../EventItem';
import { useOnScreen } from 'domains/eventPage/hooks/useOnScreen';
import { useGetMainListEventInfinite } from 'domains/eventPage/hooks/useGetMainListEventInfinite';

const ListView = () => {
  const filterState = useSelector((state) => state.itFilter);
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } =
    useGetMainListEventInfinite(filterState);

  const bottomRef = useRef(null);
  const inView = useOnScreen(bottomRef.current);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage, isFetching]);

  return (
    <>
      <S.EventList>
        {data?.map((eventItem, idx) => (
          <S.EventItemContainer key={idx}>
            <EventItem eventInfo={eventItem} />
          </S.EventItemContainer>
        ))}
      </S.EventList>
      <S.bottomObserver ref={bottomRef} />
    </>
  );
};

export default ListView;
