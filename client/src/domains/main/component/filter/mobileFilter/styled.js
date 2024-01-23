import styled from '@emotion/styled';

export const Container = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const Separator = styled.div`
  width: 100%;
  height: 7px;
  background: #f3f3f3;
  margin-top: 10px;
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
  padding: 0 25px;
  display: flex;
  flex-wrap: nowrap;
  gap: 7px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SearchContainer = styled.div`
  width: calc(100% - 50px);
  margin: 0 auto;
`;
