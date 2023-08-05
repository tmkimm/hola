import styled from '@emotion/styled';

export const SelectConatiner = styled.div`
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
  border: ${({ isSelected }) => (isSelected ? '1px solid #00b9ae' : '1px solid #E3E3E3')};
  color: ${({ isSelected }) => (isSelected ? '#00b9ae' : '#646464')};
  background: #fff;
  cursor: pointer;
`;
