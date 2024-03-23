import styled from 'styled-components';

export const Container = styled.section`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  height: 20px;
`;

export const Likes = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

export const Views = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const LikesImg = styled.img`
  display: block;
  width: 20px;
  height: auto;
`;

export const EyeImg = styled.img`
  display: block;
  width: 20px;
  height: auto;
`;

export const Text = styled.span`
  color: #999999;
  font-size: 14px;
  font-weight: 500;
`;
