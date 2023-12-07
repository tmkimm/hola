import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CommonBanner from 'component/banner/commonBanner';
import NewBanner from 'component/banner/newBanner';

const bannerItem = [
  {
    title: '더 편해진 올라!',
    subTitle: '연말 선물같은 설렘과 함께 찾아온 패치노트 🎁',
    imgSrc: '/images/banner/banner231206.png',
    link: 'https://www.notion.so/Hola-What-s-new-23-12-1dae5aa7acb245edb5d5d98fb9386719',
    badgeTitle: 'NOTICE',
    bgColor: '#A52A27',
    badgeBgColor: '#009953',
    badgeTextColor: '#ffffff',
    titleColor: '#ffffff',
  },
  {
    title: 'Hola! 공식 인스타그램 OPEN!',
    subTitle: '팔로우하고 다양한 올라 소식을 만나보세요 👋',
    imgSrc: '/images/banner/33.png',
    link: 'https://instagram.com/holaworld_official',
    badgeTitle: 'NOTICE',
    bgColor: '#ffeae9',
    badgeBgColor: '#fb817f',
    badgeTextColor: '#ffffff',
    titleColor: '#000000',
  },
  {
    title: '스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법',
    subTitle: '올라에서 함께할 팀원을 찾으세요 🔍',
    imgSrc: '/images/banner/11.png',
    link: 'https://temporal-weather-18e.notion.site/Hola-_______-613200b663ab47b2b59c8c5cf0011b2f',
    bgColor: '#edfaf7',
    titleColor: '#000000',
  },
];
export const Carousel = () => {
  const settings = {
    dots: false, //화면아래 컨텐츠 갯수 표시
    autoplay: true, // 자동 스크롤 사용 여부
    autoplaySpeed: 5000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    draggable: true, //드래그 가능 여부
    infinite: true, //무한반복옵션
    lazyLoad: true,
    speed: 400, //다음버튼 누르고 다음화면 뜨는데까지 걸리는 시간
    slidesToShow: 1, //화면에 보여질 개수
    arrows: false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          dots: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {bannerItem.map((banner, idx) => {
        return idx === 0 ? (
          <NewBanner
            title={banner.title}
            subTitle={banner.subTitle}
            imgSrc={banner.imgSrc}
            link={banner.link}
            badgeTitle={banner.badgeTitle}
            titleColor={banner.titleColor}
            bgColor={banner.bgColor}
            badgeBgColor={banner.badgeBgColor}
            badgeTextColor={banner.badgeTextColor}
            totalLength={bannerItem.length}
            currentIndex={idx}
          />
        ) : (
          <CommonBanner
            title={banner.title}
            subTitle={banner.subTitle}
            imgSrc={banner.imgSrc}
            link={banner.link}
            badgeTitle={banner.badgeTitle}
            titleColor={banner.titleColor}
            bgColor={banner.bgColor}
            badgeBgColor={banner.badgeBgColor}
            badgeTextColor={banner.badgeTextColor}
            totalLength={bannerItem.length}
            currentIndex={idx}
          />
        );
      })}

      {/* <InstagramBanner />
      <SecondBanner />
      <FirstBanner /> */}
    </Slider>
  );
};
