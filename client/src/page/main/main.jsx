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
    if (window.innerWidth < 767) return;
    console.log('window.in', window.innerWidth);
    mutate({ advertisementId: '65cb764fc9cb7c177c881ac1', logType: 'impression' });
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
