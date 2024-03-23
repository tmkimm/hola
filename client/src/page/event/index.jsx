import React from 'react';
import * as S from './styled';
import Navbar from 'component/nav_bar/navbar';
import { EventCarousel } from 'domains/eventPage/components/EventCarousel';

import MainEvents from 'domains/eventPage/components/MainEvents';
import RecommendEvents from 'domains/eventPage/components/RecommendEvents';

const EventPage = () => {
  return (
    <S.Container>
      <Navbar isBackBtn={false} />
      <EventCarousel />
      <RecommendEvents />
      <MainEvents />
    </S.Container>
  );
};

export default EventPage;
