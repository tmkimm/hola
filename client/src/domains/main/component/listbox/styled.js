import styled from '@emotion/styled';
import { Popover } from '@headlessui/react';

export const Container = styled.div`
  position: relative;
`;

export const Languages = styled.div`
  width: 100px;
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

export const PopoverContainer = styled(Popover)`
  width: 140px;
  height: 38px;
`;

export const PopoverButton = styled(Popover.Button)`
  justify-content: space-between;
  padding-left: 18px;
  padding-right: 10px;
  width: 140px;
  height: 38px;
  border: ${({ isSelected }) => (isSelected ? '1px solid #00b9ae' : '1px solid #E3E3E3')};
  color: ${({ isSelected }) => (isSelected ? '#00b9ae' : '#646464')};
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  border-radius: 36px;
  margin-bottom: 8px;

  :hover {
    border: 1px solid #d1d1d1;
  }
`;

export const PopoverPanel = styled(Popover.Panel)`
  max-width: 1000px;
  width: 90%;
  position: absolute;
  z-index: 10;
  padding: 30px;
  left: 0px;
  border-radius: 30px;
  border: 2px solid #ddd;
  background: #fff;
`;
