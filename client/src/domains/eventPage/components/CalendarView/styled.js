import styled from '@emotion/styled';

export const TotalContainer = styled.div`
  margin-top: 40px;
`;

export const Content = styled.div`
  overflow: hidden;
  color: #333;
  font-family: Spoqa Han Sans Neo;
  font-size: 12px;

  ::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 4px;
    background: red;
    display: inline-block;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  margin-bottom: 40px;
`;

export const Title = styled.div`
  color: #444;
  font-size: 26px;
  font-weight: 700;
`;

export const ArrowImg = styled.img`
  display: block;
  width: 30px;
  height: 30px;
`;
