import styled from '@emotion/styled';

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
  padding-right: 40px;
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
  min-width: 30px;
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
