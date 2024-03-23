import styled from '@emotion/styled';

export const Container = styled.div`
  margin-top: 70px;
  min-height: 1000px;

  @media screen and (max-width: 1300px) {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 980px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
    margin-top: 25px;
    min-height: 0;
  }
`;

export const Wrapper = styled.div``;
