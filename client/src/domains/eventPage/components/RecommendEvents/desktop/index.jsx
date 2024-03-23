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

  const getNextId = (id) => {
    const idList = recommendEvents?.map((d) => d._id);
    const index = idList.indexOf(id);

    // 특정 요소가 배열에 없거나 마지막 요소라면 null을 반환
    if (index === -1) {
      return null;
    }

    // 다음 요소 반환
    return idList[index + 1];
  };

  const getPrevId = (id) => {
    const idList = recommendEvents?.map((d) => d._id);
    const index = idList.indexOf(id);

    // 첫번쨰 요소면 null 반환
    if (index === 0) {
      return null;
    }

    // 다음 요소 반환
    return idList[index - 1];
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>추천 이벤트</S.Title>
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
        {recommendEvents?.map((eventItem) => (
          <S.EventItemContainer key={eventItem._id}>
            <EventItem eventInfo={eventItem} getNextId={getNextId} getPrevId={getPrevId} />
          </S.EventItemContainer>
        ))}
      </S.CustomSlider>
    </S.Container>
  );
};

export default RecommendEventsDesktop;
