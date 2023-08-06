import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileFilter from './mobileFilter';
import DesktopFilter from './desktopFilter';

const Filter = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  return isMobile ? <MobileFilter /> : <DesktopFilter />;
};

export default Filter;
