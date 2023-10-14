import styled from '@emotion/styled';

export const TotalContainer = styled.div`
  margin-top: 40px;
`;

export const Content = styled.div`
  padding-left: 8px;
  display: flex;
  gap: 7px;
  overflow: hidden;
  color: #333;
  font-size: 12px;
  align-items: center;
  margin: 2px;
`;

export const TimeText = styled.span`
  color: var(--color-system-gray-777777, #777);
  font-size: 12px;

  ::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 7px;
    background: ${({ color }) => color};
    display: inline-block;
  }
`;

export const TitleText = styled.span`
  color: #333;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.36px;
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
  cursor: pointer;
`;
