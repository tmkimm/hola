import React from 'react';
import { useMediaQuery } from 'react-responsive';
import TrendingDesktop from './desktop';
import TrendingMobile from './mobile';
import { useGetTrending } from 'domains/main/hooks/useGetTrending';

const Trending = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const { data: trendings, isLoading } = useGetTrending();

  if (isLoading) return <></>;

  return isMobile ? (
    <TrendingMobile trendings={trendings} />
  ) : (
    <TrendingDesktop trendings={trendings} />
  );
};

export default Trending;
