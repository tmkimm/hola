import styled from '@emotion/styled';

export const EventList = styled.ul`
  display: flex;
  gap: 26px;
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

  @media screen and (max-width: 1300px) {
    width: 310px;
  }

  @media screen and (max-width: 980px) {
    width: calc(50% - 8px);
  }
`;

export const bottomObserver = styled.div`
  height: 10px;
  padding-bottom: 100px;
`;
