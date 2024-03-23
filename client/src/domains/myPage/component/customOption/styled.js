import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 8px 16px;
  display: flex;
  gap: 6px;
  align-items: center;
  height: 50px;

  :hover {
    background-color: #deebff;
  }
`;

export const LogoImg = styled.img`
  display: block;
  width: 32px;
  height: 32px;
`;

export const Label = styled.span`
  color: #333;
`;
