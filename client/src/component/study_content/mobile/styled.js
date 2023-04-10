import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const Title = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  color: #000000;
  margin-bottom: 48px;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const UserContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const UserImg = styled.img`
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const UserName = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: -0.04em;
  color: #000000;
`;

export const StudyDate = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.4);
`;
