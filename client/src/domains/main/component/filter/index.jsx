import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileFilter from './newMobileFilter';
import DesktopFilter from './newDesktopFilter';

const Filter = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  return isMobile ? <MobileFilter /> : <DesktopFilter />;
};

export default Filter;
