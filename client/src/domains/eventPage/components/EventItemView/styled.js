import styled from '@emotion/styled';

export const EventContainer = styled.li`
  width: 100%;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const AdImage = styled.img`
  display: block;
  width: 100%;
  height: 180px;
  border-radius: 15px;

  @media screen and (max-width: 768px) {
    height: 200px;
  }

  @media screen and (max-width: 500px) {
    height: 100px;
  }
`;

export const PositionAndDateContainer = styled.div`
  display: flex;
  margin-top: 15px;
  gap: 10px;
  color: #999;
  font-size: 15px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.45px;

  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

export const DateInfo = styled.span`
  font: inherit;
`;

export const PosisionInfo = styled.span`
  font: inherit;
`;

export const Title = styled.h1`
  margin-top: 10px;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  line-height: 140%; /* 22.4px */
  letter-spacing: -0.8px;
  height: 45px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
  overflow: hidden;

  @media screen and (max-width: 500px) {
    margin-top: 8px;
    font-size: 14px;
    height: 40px;
  }
`;

export const Badge = styled.div`
  width: fit-content;
  margin-top: ${({ isRecommend }) => (isRecommend ? '0px' : '15px')};
  display: flex;
  padding: 3.5px 10px;
  font-size: 13px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-weight: 700;
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};

  @media screen and (max-width: 500px) {
    font-size: 10px;
    padding: 2px 10px;
    margin-top: 10px;
  }
`;
