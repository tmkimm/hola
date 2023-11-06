import styled from '@emotion/styled';

export const EventList = styled.ul`
  display: flex;
  gap: 27px;
  margin-top: 36px;
  flex-wrap: wrap;

  @media screen and (max-width: 950px) {
    padding: 20px;
    gap: 15px;
    margin-top: 0;
  }
`;

export const EventItemContainer = styled.li`
  width: 300px;

  @media screen and (max-width: 950px) {
    width: calc(50% - 8px);
  }
`;
