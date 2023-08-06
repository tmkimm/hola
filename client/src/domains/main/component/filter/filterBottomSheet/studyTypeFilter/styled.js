import styled from '@emotion/styled';

export const LanguageList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 16px;
`;

export const LanguageItem = styled.li`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  color: ${({ selected }) => (selected ? '#6ED1C0' : '#999999')};
  border-radius: 30px;
  border: ${({ selected }) => (selected ? '1px solid #6ED1C0' : '1px solid #e1e1e1')};
`;
