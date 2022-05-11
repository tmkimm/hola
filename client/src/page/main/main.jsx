import React from 'react';
//import styles from './main.module.css';

import Navbar from 'component/nav_bar/navbar';
//import Banner from 'component/banner/banner';
import { DesktopFilter } from 'component/filter/desktop';

import Rating from 'component/rating/rating';
import { MainContent } from 'component/mainContent';
import { Carousel } from 'component/carousel';

/* 
main page의 layout을 담당하는 component입니다. 
최신, 트렌딩 두가지의 기준으로 데이터를 보여줍니다.
*/

const Main = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      {/* <Banner /> */}
      <DesktopFilter />
      <MainContent />
      <Rating />
    </>
  );
};
export default Main;
