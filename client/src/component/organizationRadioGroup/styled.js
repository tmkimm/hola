import styled from '@emotion/styled';
import { RadioGroup } from '@headlessui/react';

export const Text = styled.span`
  color: #888;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.42px;
`;

export const Checked = styled.img`
  display: block;
  width: 16px;
  height: 16px;
`;

export const UnChecked = styled.span`
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid #e1e1e1;
  border-radius: 50%;
`;

export const RadioOptions = styled(RadioGroup.Option)`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const RadioGroups = styled(RadioGroup)`
  display: flex;
  gap: 8px;
`;
