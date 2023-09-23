import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Container = styled.section`
  margin-top: 63px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Title = styled.div`
  color: #000;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 26px */
  letter-spacing: -0.78px;
`;

export const EventList = styled.ul`
  display: flex;
  gap: 27px;
`;

export const CustomSlider = styled(Slider)`
  // Reference: https://github.com/akiran/react-slick/issues/1940
  .slick-track {
    display: flex;
    align-items: stretch;
    margin-left: 0;
  }

  .slick-slide {
    // HACK: build하고 나면 selector 우선순위에 의해 flex가 사라지기때문에 important를 넣습니다.
    display: flex !important;
    align-self: stretch;
    height: unset;

    & > div {
      display: flex;
      align-self: stretch;
      width: 100%;
      cursor: pointer;
    }
  }

  /* .slick-prev {
    left: -44px;
  }

  .slick-next {
    right: -44px;
  } */

  .slick-arrow {
    display: none;
  }

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }

  .slick-slide {
    margin: 0 12px; // space(여백)/2
  }
  .slick-list {
    margin: 0 -12px; // space(여백)/-2
  }

  /* @media  {
    .slick-slide,
    .slick-slide:last-child {
      padding: 0;
    }

    .slick-slide {
      width: 240px;
      margin-right: 8px;
    }
  } */
`;

export const Skeleton = styled.div`
  width: 100%;
  padding: 0 15px;
  margin-top: 25px;
  height: 247px;
  margin: 100px auto 60px 14px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Arrows = styled.img`
  display: block;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  display: flex;
  gap: 6px;
`;
