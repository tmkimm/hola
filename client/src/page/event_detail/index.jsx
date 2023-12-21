import { useGetEventDtail } from 'domains/eventPage/hooks/useGetEventDetail';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import DetailMobile from './mobile';
import DetailDesktop from './desktop';

const EventDetailPage = () => {
  const location = useLocation();
  const eventid = location.pathname.split('/')[2];
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { data: detailData, isLoading } = useGetEventDtail(eventid);

  return isMobile ? (
    <DetailMobile detailData={detailData} />
  ) : (
    <DetailDesktop detailData={detailData} />
  );
};

export default EventDetailPage;
