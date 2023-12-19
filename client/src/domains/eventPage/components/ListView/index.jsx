import React from 'react';
import * as S from './styled';
import { useGetMainListEvent } from 'domains/eventPage/hooks/useGetMainListEvent';
import { useSelector } from 'react-redux';
import EventItem from '../EventItem';
import { useModalState } from 'hooks/useModalCustom';
import EventDetailModal from '../EventDetailModal';

const ListView = () => {
  const filterState = useSelector((state) => state.itFilter);
  const { data } = useGetMainListEvent(filterState);
  const { modalVisible, openModal, closeModal } = useModalState();
  return (
    <>
      <S.EventList>
        {data?.map((eventItem, idx) => (
          <S.EventItemContainer>
            <EventItem key={idx} eventInfo={eventItem} />
          </S.EventItemContainer>
        ))}
      </S.EventList>
    </>
  );
};

export default ListView;
