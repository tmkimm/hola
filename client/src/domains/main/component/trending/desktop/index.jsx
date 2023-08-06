import React, { useRef } from 'react';
import * as S from './styled';
import Badge from 'component/badge/badge';
import differenceInDays from 'date-fns/differenceInDays';
import { formatDate } from 'common/utils';
import { useHistory } from 'react-router';
import { HolaLogEvent } from 'common/GA';

const TrendingDesktop = ({ trendings, isLoading }) => {
  const history = useHistory();
  const sliderRef = useRef();
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

  if (isLoading)
    return (
      <S.Skeleton>
        <S.Title>🔥 이번주 올라 인기글</S.Title>
      </S.Skeleton>
    );

  return (
    <S.Box>
      <S.TitleContainer>
        <S.Title>🔥 이번주 올라 인기글</S.Title>
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
        {trendings.map((trending) => {
          const { title, startDate, views, type, id } = trending;
          const remainDay = differenceInDays(new Date(startDate), new Date());
          return (
            <S.Container
              key={title}
              to={`/study/${id}`}
              onClick={(e) => {
                e.preventDefault();
                HolaLogEvent('select_trending', { category: id });
                history.push(`/study/${id}`);
              }}
            >
              <S.Info>
                <Badge state={type === '1' ? 'project' : 'study'} />
                <S.Deadline>
                  {remainDay === 0 ? '🚨 오늘 마감' : `🚨 마감 ${remainDay}일전`}
                </S.Deadline>
              </S.Info>
              <S.DeadlineInfo>{`마감일 | ${formatDate(startDate)}`}</S.DeadlineInfo>
              <S.ProjectTitle>{title}</S.ProjectTitle>
              <S.ViewCount>👀 조회수 {views}회</S.ViewCount>
            </S.Container>
          );
        })}
      </S.CustomSlider>
    </S.Box>
  );
};

export default TrendingDesktop;
