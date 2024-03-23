import React, { useEffect, useRef } from 'react';
import * as S from './styled';
import { useSelector } from 'react-redux';
import EventItem from '../EventItem';
import { useOnScreen } from 'domains/eventPage/hooks/useOnScreen';
import { useGetMainListEventInfinite } from 'domains/eventPage/hooks/useGetMainListEventInfinite';
import { useGetUserLikes } from 'domains/eventPage/hooks/useGetUserLikes';

const ListView = () => {
  const filterState = useSelector((state) => state.itFilter);
  const { data: likesData } = useGetUserLikes(filterState.isLiked);
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } =
    useGetMainListEventInfinite(filterState);

  const bottomRef = useRef(null);
  const inView = useOnScreen(bottomRef.current);

  const renderData = filterState.isLiked ? likesData : data;

  const getNextId = (id) => {
    const idList = renderData?.map((d) => d._id);
    const index = idList.indexOf(id);

    // 특정 요소가 배열에 없거나 마지막 요소라면 null을 반환
    if (index === -1 && !hasNextPage) {
      return null;
    }

    if (index === idList.length - 2) {
      fetchNextPage();
    }

    // 다음 요소 반환
    return idList[index + 1];
  };

  const getPrevId = (id) => {
    const idList = renderData?.map((d) => d._id);
    const index = idList.indexOf(id);

    // 첫번쨰 요소면 null 반환
    if (index === 0) {
      return null;
    }

    // 다음 요소 반환
    return idList[index - 1];
  };

  useEffect(() => {
    if (!filterState.isLiked && inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage, isFetching]);

  return (
    <>
      <S.EventList>
        {renderData?.map((eventItem, idx) => (
          <S.EventItemContainer key={idx}>
            <EventItem eventInfo={eventItem} getNextId={getNextId} getPrevId={getPrevId} />
          </S.EventItemContainer>
        ))}
      </S.EventList>
      <S.bottomObserver ref={bottomRef} />
    </>
  );
};

export default ListView;
