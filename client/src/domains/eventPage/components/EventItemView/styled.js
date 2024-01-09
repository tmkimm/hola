import styled from '@emotion/styled';

export const EventContainer = styled.li`
  width: 100%;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  position: relative;

  :hover {
    .overlay {
      display: flex;
    }
  }

  @media screen and (max-width: 500px) {
    :hover {
      .overlay {
        display: none;
      }
    }
  }
`;

export const AdImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 5/3;

  border-radius: 15px;
  border: 1px solid rgba(23, 23, 25, 0.15);

  @media screen and (max-width: 768px) {
    height: 200px;
  }

  @media screen and (max-width: 500px) {
    height: 100px;
  }
`;

export const PositionAndDateContainer = styled.div`
  display: flex;
  margin-top: 10px;
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
  overflow: hidden;

  @media screen and (max-width: 500px) {
    margin-top: 8px;
    font-size: 14px;
  }
`;

export const Badge = styled.div`
  width: fit-content;
  margin-top: 15px;
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

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* 덮어질 내용의 배경색 및 투명도 조절 */
  display: none;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 40px;
  color: white; /* 덮어질 내용의 글자색 등 조절 */
  border-radius: 15px;
  font-size: 14px;
  font-weight: 500;
  gap: 8px;
`;

export const DetailInfo = styled.div`
  display: flex;
  gap: 20px;
`;

export const DetailInfoDecription = styled.span`
  white-space: pre-line;
`;

export const LikeContainer = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;
export const LikesImg = styled.img`
  display: block;
  width: 24px;
  height: auto;
  background: transparent;
`;
