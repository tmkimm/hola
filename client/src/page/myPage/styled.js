import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

export const UrlGroup = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const UrlSet = styled.li`
  display: flex;
  gap: 8px;
`;

export const CustomInput = styled.input`
  width: 500px;
  height: 48px;
`;

export const CustomTextArea = styled.textarea`
  height: 100px;
  width: 500px;
`;

export const Button = styled.input`
  height: 48px;
  width: 500px;
  background-color: #ffe04b;
  border: none;
`;

export const AddButton = styled.div`
  cursor: pointer;
`;
