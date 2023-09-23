import React from 'react';
import * as S from './styled';
import Navbar from 'component/nav_bar/navbar';
import { EventCarousel } from 'domains/eventPage/components/EventCarousel';

const EventPage = () => {
  return (
    <S.Container>
      <Navbar isBackBtn={false} />
      <EventCarousel />
      <div>안녕</div>
    </S.Container>
  );
};

export default EventPage;
