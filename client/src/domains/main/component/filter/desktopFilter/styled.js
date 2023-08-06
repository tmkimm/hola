import styled from '@emotion/styled';

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
    width: 670px;
  }

  @media screen and (max-width: 575px) {
    padding: 0 16px;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SelectContainer = styled.div`
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
