import React from 'react';
import Navbar from 'component/nav_bar/navbar';
import Rating from 'component/rating/rating';
import { MainContent } from 'domains/main/component/mainContent';
import { Carousel } from 'domains/main/component/carousel';
import TopButton from 'component/top_button/TopButton';
import Footer from 'component/footer/footer';
import Trending from 'domains/main/component/trending';

const Main = () => {
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
