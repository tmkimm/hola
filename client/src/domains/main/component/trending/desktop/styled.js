import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Box = styled.div`
  width: 100%;
  margin-top: 70px;
  max-width: 1300px;
  padding: 0 15px;
  margin: 100px auto 60px auto;

  @media screen and (max-width: 1300px) {
    max-width: 960px;
  }

  @media screen and (max-width: 980px) {
    max-width: 630px;
  }
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

export const Container = styled.div`
  width: 300px;
  color: black;
  display: flex;
  width: 340px;
  padding: 20px 25px;
  gap: 10px;
  border-radius: 20px;
  border: 2px solid #d1d1d1;
  background: #fff;
`;

export const Title = styled.h2`
  color: #000;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 26px */
  letter-spacing: -0.78px;
  margin: 0 0 24px 0;
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

export const Info = styled.div`
  display: flex;
  height: 26px;
  justify-content: space-between;
  align-items: center;
`;

export const Deadline = styled.div`
  padding: 2px 8px;
  border-radius: 20px;
  border: 1px solid #ea726f;
  color: #ea726f;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.56px;
`;

export const DeadlineInfo = styled.div`
  color: #999;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  margin-top: 20px;
`;

export const ProjectTitle = styled.h1`
  margin: 10px 0 0 0;
  color: #000;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 28px */
  letter-spacing: -1px;
  height: 56px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
  overflow: hidden;
`;

export const ViewCount = styled.div`
  margin-top: 15px;
  color: #4e4e4e;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 14px */
  letter-spacing: -0.56px;
  text-align: end;
`;
