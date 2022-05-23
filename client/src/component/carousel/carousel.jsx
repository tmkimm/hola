import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//import styles from './carousel.module.css';
import { FirstBanner, SecondBanner } from 'component/banner';

export const Carousel = () => {
  const settings = {
    dots: true, //화면아래 컨텐츠 갯수 표시
    autoplay: true, // 자동 스크롤 사용 여부
    autoplaySpeed: 5000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    draggable: true, //드래그 가능 여부
    infinite: true, //무한반복옵션
    lazyLoad: true,
    speed: 400, //다음버튼 누르고 다음화면 뜨는데까지 걸리는 시간
    slidesToShow: 1, //화면에 보여질 개수
    arrows: false,
  };
  const slide = [
    {
      id: '0',
      src: '/images/banner/1.png',
      division: 'hola',
    },
    {
      id: '1',
      src: '/images/banner/2.jpg',
      division: 'udemy',
    },
  ];
  return (
    <Slider {...settings}>
      <SecondBanner />
    </Slider>
  );
};
