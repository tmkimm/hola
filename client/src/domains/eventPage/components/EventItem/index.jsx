import React from 'react';
import * as S from './styled';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getBadgeColor, getBadgeTitle } from 'domains/eventPage/utils/getBadgeTitle';
import { useModalState } from 'hooks/useModalCustom';
import EventDetailModal from '../EventDetailModal';

const EventItem = ({ eventInfo }) => {
  const { _id, title, content, imageUrl, onlineOrOffline, startDate, link, eventType } = eventInfo;
  const { modalVisible, openModal, closeModal } = useModalState();
  return (
    <>
      <S.EventContainer onClick={() => openModal()}>
        <S.ImageContainer>
          <S.AdImage src={imageUrl}></S.AdImage>
        </S.ImageContainer>
        <S.PositionAndDateContainer>
          <S.DateInfo>{format(new Date(startDate), 'M월 d일(E)', { locale: ko })}</S.DateInfo>
          <S.PosisionInfo>{onlineOrOffline === 'on' ? '온라인' : '오프라인'}</S.PosisionInfo>
        </S.PositionAndDateContainer>
        <S.Title>{title}</S.Title>
        <S.Badge color={getBadgeColor(eventType)}>{getBadgeTitle(eventType)}</S.Badge>
      </S.EventContainer>
      {modalVisible && <EventDetailModal id={_id} isOpen={modalVisible} closeModal={closeModal} />}
    </>
  );
};

export default EventItem;
