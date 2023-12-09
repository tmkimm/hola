import styled from '@emotion/styled';

export const Container = styled.div`
  margin-top: 70px;
`;

export const FilterList = styled.ul`
  display: flex;
  gap: 30px;
`;

export const FilterItem = styled.li`
  color: ${({ $isSelected }) => ($isSelected ? '#444444' : '#44444480')};
  font-size: 26px;
  font-weight: 700;
  line-height: 45px; /* 173.077% */
  letter-spacing: -0.78px;
  cursor: pointer;
`;

export const CategoryContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  padding: 0 20px;

  @media screen and (max-width: 1300px) {
    width: 1000px;
  }

  @media screen and (max-width: 980px) {
    width: 850px;
  }

  @media screen and (max-width: 575px) {
    padding: 0 16px;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
`;

export const SelectContainer = styled.div`
  margin-top: 33px;
  display: flex;
  gap: 10px;
`;

export const SelectItem = styled.div`
  display: flex;
  height: 38px;
  padding: 0 22px;
  justify-content: center;
  align-items: center;
  border-radius: 36px;
  border: ${({ selected }) => (selected ? '1px solid #00b9ae' : '1px solid #E3E3E3')};
  color: ${({ selected }) => (selected ? '#00b9ae' : '#646464')};
  background: #fff;
  font-weight: 500;
  cursor: pointer;
`;
