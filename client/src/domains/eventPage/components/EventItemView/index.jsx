import React from 'react';
import * as S from './styled';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getBadgeColor, getBadgeTitle } from 'domains/eventPage/utils/getBadgeTitle';
import EventItemOverlay from '../EventItemOverlay';

const EventItemView = ({
  eventInfo,
  onEventClick,
  isOverlayNeeded = false,
  isSmallImage = false,
}) => {
  const { title, imageUrl, onlineOrOffline, startDate, eventType, _id, smallImageUrl } = eventInfo;

  return (
    <>
      <S.EventContainer onClick={onEventClick} key={_id}>
        <S.ImageContainer>
          <S.AdImage src={isSmallImage ? smallImageUrl : imageUrl}></S.AdImage>
          {isOverlayNeeded && <EventItemOverlay eventInfo={eventInfo} />}
        </S.ImageContainer>
        <S.Badge color={getBadgeColor(eventType)}>{getBadgeTitle(eventType)}</S.Badge>
        <S.Title>{title}</S.Title>
        <S.PositionAndDateContainer>
          <S.DateInfo>{format(new Date(startDate), 'M월 d일(E)', { locale: ko })}</S.DateInfo>
          <S.PosisionInfo>{onlineOrOffline === 'on' ? '온라인' : '오프라인'}</S.PosisionInfo>
        </S.PositionAndDateContainer>
      </S.EventContainer>
    </>
  );
};

export default EventItemView;
