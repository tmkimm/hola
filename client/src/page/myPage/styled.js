import styled from '@emotion/styled';

export const Container = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
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

export const Nickname = styled.div`
  color: #000;
  text-align: center;
  font-size: 26px;
  font-weight: 500;
  line-height: 150%; /* 39px */
  letter-spacing: -0.78px;
  margin: 30px 0 40px 0;
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

export const OrganizationInfo = styled.div`
  display: flex;
  justify-content: space-between;
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

export const RequiredDot = styled.span`
  color: var(--color-system-gray-333333, #ea726f);
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

export const FormItemTitle = styled.div`
  color: #333;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.28px;
`;

export const FormInput = styled.input`
  display: flex;
  width: 100%;
  font-size: 16px;
  min-height: 50px;
  padding: 15px 13px;
  align-items: flex-start;
  border-radius: 5px;
  border: 1px solid #e1e2e3;
`;

export const FormTextArea = styled.textarea`
  height: 100px;
  width: 500px;
  padding: 15px 13px;
  border-radius: 5px;
  border: 1px solid #e1e2e3;
  resize: none;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;
