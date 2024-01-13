import React, { useRef } from 'react';
import * as S from './styled';
import EventItem from '../../EventItem';

const config = {
  dots: false,
  autoplay: false,
  arrows: false,
  draggable: true,
  speed: 400,
  slidesToShow: 4,
  slidesToScroll: 4,
  infinite: false,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        variableWidth: true,
      },
    },
  ],
};

const RecommendEventsDesktop = ({ recommendEvents }) => {
  const sliderRef = useRef();

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>추천 이벤트(AD)</S.Title>
        <S.ImageContainer>
          <S.Arrows
            src={'/images/info/left-arrow-button.png'}
            onClick={() => sliderRef.current.slickPrev()}
          />
          <S.Arrows
            src={'/images/info/right-arrow-button.png'}
            onClick={() => sliderRef.current.slickNext()}
          />
        </S.ImageContainer>
      </S.TitleContainer>
      <S.CustomSlider {...config} ref={sliderRef}>
        {recommendEvents?.map((eventItem, idx) => (
          <S.EventItemContainer key={idx}>
            <EventItem eventInfo={eventItem} />
          </S.EventItemContainer>
        ))}
      </S.CustomSlider>
    </S.Container>
  );
};

export default RecommendEventsDesktop;
