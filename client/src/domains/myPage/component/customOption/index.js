import React from 'react';

const CustomOption = ({ innerProps, isDisabled, ...props }) => {
  return !isDisabled ? <div {...innerProps}>{props.data.label}</div> : null;
};

export default CustomOption;
