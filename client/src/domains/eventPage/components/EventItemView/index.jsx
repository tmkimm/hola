import React from 'react';
import * as S from './styled';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getBadgeColor, getBadgeTitle } from 'domains/eventPage/utils/getBadgeTitle';

const EventItemView = ({ eventInfo, onEventClick, isRecommend }) => {
  const { title, imageUrl, onlineOrOffline, startDate, eventType, _id } = eventInfo;

  return (
    <>
      <S.EventContainer onClick={onEventClick} key={_id}>
        <S.ImageContainer>
          <S.AdImage src={imageUrl}></S.AdImage>
        </S.ImageContainer>
        <S.PositionAndDateContainer>
          <S.DateInfo>{format(new Date(startDate), 'M월 d일(E)', { locale: ko })}</S.DateInfo>
          <S.PosisionInfo>{onlineOrOffline === 'on' ? '온라인' : '오프라인'}</S.PosisionInfo>
        </S.PositionAndDateContainer>
        <S.Title isRecommend={isRecommend}>{title}</S.Title>
        <S.Badge isRecommend={isRecommend} color={getBadgeColor(eventType)}>
          {getBadgeTitle(eventType)}
        </S.Badge>
      </S.EventContainer>
    </>
  );
};

export default EventItemView;
