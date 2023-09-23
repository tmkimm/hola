import React from 'react';
import * as S from './styled';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getBadgeColor, getBadgeTitle } from 'domains/eventPage/utils/getBadgeTitle';

const EventItem = ({ eventInfo }) => {
  const { _id, title, content, imageUrl, onlineOrOffline, startDate, link, eventType } = eventInfo;
  return (
    <S.EventContainer>
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
  );
};

export default EventItem;
