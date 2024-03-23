import { useGetEventDtail } from 'domains/eventPage/hooks/useGetEventDetail';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import DetailMobile from './mobile';
import DetailDesktop from './desktop';
import { useGetRelativeEvent } from 'domains/eventPage/hooks/useGetRelativeEvent';

const EventDetailPage = () => {
  const location = useLocation();
  const eventid = location.pathname.split('/')[2];
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { data: detailData } = useGetEventDtail(eventid);
  const { data: relativeEvents } = useGetRelativeEvent(eventid, detailData?.eventType);

  return isMobile ? (
    <DetailMobile detailData={detailData} relativeEvents={relativeEvents} />
  ) : (
    <DetailDesktop detailData={detailData} relativeEvents={relativeEvents} />
  );
};

export default EventDetailPage;
