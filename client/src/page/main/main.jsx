import React, { useEffect } from 'react';
import Navbar from 'component/nav_bar/navbar';
import Rating from 'component/rating/rating';
import { MainContent } from 'domains/main/component/mainContent';
import { Carousel } from 'domains/main/component/mainCarousel';
import TopButton from 'component/top_button/TopButton';
import Footer from 'component/footer/footer';
import Trending from 'domains/main/component/trending';
import { useEventLog } from 'domains/main/hooks/useEventLog';

const Main = () => {
  const { mutate } = useEventLog();
  useEffect(() => {
    mutate({ advertisementId: '65b3c33420a6057557e3a2cb', logType: 'impression' });
  }, []);

  return (
    <>
      <Navbar />
      <Carousel />
      <Trending />
      <MainContent />
      <TopButton />
      <Rating />
      <Footer />
    </>
  );
};
export default Main;
