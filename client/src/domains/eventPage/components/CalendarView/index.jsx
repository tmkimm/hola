import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileCalendarView from './mobile';
import DesktopCalendarView from './desktop';

const CalendarView = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return isMobile ? <MobileCalendarView /> : <DesktopCalendarView />;
};

export default CalendarView;
