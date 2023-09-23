import React from 'react';
import Navbar from 'component/nav_bar/navbar';
import Rating from 'component/rating/rating';
import { MainContent } from 'domains/main/component/mainContent';
import { MainCarousel } from 'domains/main/component/mainCarousel';
import TopButton from 'component/top_button/TopButton';
import Footer from 'component/footer/footer';
import Trending from 'domains/main/component/trending';

const Main = () => {
  return (
    <>
      <Navbar />
      <MainCarousel />
      <Trending />
      <MainContent />
      <TopButton />
      <Rating />
      <Footer />
    </>
  );
};
export default Main;
