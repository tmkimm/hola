import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BottomSheet } from 'react-spring-bottom-sheet';

export const Popup = styled(BottomSheet)`
  [data-rsbs-overlay] {
    background: white;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  position: relative;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  padding: 8px 20px 30px 20px;

  @media screen and (max-width: 500px) {
    height: 430px;
  }

  @media screen and (max-width: 400px) {
    height: 470px;
  }
`;

export const Categories = styled.ul`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 15px;
  margin-bottom: 25px;
`;

export const CategoryItem = styled.li`
  display: flex;
  color: ${({ selected }) => (selected ? '#333333' : '#777')};
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 15px */
  letter-spacing: -0.45px;
  cursor: pointer;
  position: relative;

  ${({ selected }) =>
    selected &&
    css`
      &::after {
        content: '';
        position: absolute;
        height: 2px;
        width: calc(100% + 20px);
        background: #333;
        left: -10px;
        bottom: -15px;
      }
    `}
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin: 0 auto;
  width: 100%;
  position: absolute;
  bottom: 30px;
  left: 0;
  padding: 0 8px;
`;

export const InitButton = styled.button`
  display: flex;
  width: 40%;
  height: 44px;
  padding: 11px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #858585;
  font-size: 17px;
  font-weight: 500;
  line-height: 126.5%; /* 21.505px */
  letter-spacing: -0.51px;
  border-radius: 50px;
  background: #f1f1f1;
`;

export const ConfirmButton = styled.button`
  display: flex;
  width: 60%;
  height: 44px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  line-height: 126.5%; /* 21.505px */
  letter-spacing: -0.51px;
  border-radius: 50px;
  background: #6ed1c0;
`;

export const BottomSheetBackground = styled.div`
  bottom: 0px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  left: 0px;
  position: absolute;
  right: 0px;
  top: 0px;
`;
