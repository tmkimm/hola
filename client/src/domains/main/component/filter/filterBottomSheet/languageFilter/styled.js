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
  background: #f2f4f8;
  color: ${({ selected }) => (selected ? '#4A5E75' : '#999999')};
  background: ${({ selected }) => (selected ? '#F2F4F8' : '#FFFFFF')};
  border-radius: 30px;
  border: ${({ selected }) => (!selected ? '1px solid #e1e1e1' : 'none')};
`;
