import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useGetRecommendEvents } from 'domains/eventPage/hooks/useGetRecommendEvents';
import RecommendEventsDesktop from './desktop';
import RecommendEventsMobile from './mobile';

const RecommendEvents = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const { data: recommendEvents, isLoading } = useGetRecommendEvents();

  if (isLoading) return null;

  return isMobile ? (
    <RecommendEventsMobile recommendEvents={recommendEvents} />
  ) : (
    <RecommendEventsDesktop recommendEvents={recommendEvents} />
  );
};

export default RecommendEvents;
