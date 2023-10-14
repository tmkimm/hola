import React, { useRef } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import * as S from './styled';
import './calendar.css';
import { useGetMainCalendarEvent } from 'domains/eventPage/hooks/useGetMainCalendarEvent';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from 'store/itFilter';
import { format } from 'date-fns';
import { getDotColor } from 'domains/eventPage/utils/getDotColor';

const CalendarView = () => {
  const { year, month } = useSelector((state) => state.itFilter);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const { data } = useGetMainCalendarEvent({ year, month });

  const updateMonthAndDate = (currentDate) => {
    dispatch(changeField({ key: 'year', value: new Date(currentDate).getFullYear() }));
    dispatch(changeField({ key: 'month', value: new Date(currentDate).getMonth() + 1 }));
  };

  const calendarData =
    data
      ?.map((d) => {
        const { title, startDate, endDate, eventType } = d;
        const startItem = {
          title,
          date: format(new Date(startDate), 'yyyy-MM-dd'),
          itemType: 'start',
          eventType,
        };
        const endItem = {
          title,
          date: format(new Date(endDate), 'yyyy-MM-dd'),
          itemType: 'end',
          eventType,
        };
        return [startItem, endItem];
      })
      .flat() ?? [];

  return (
    <S.TotalContainer>
      <S.TitleContainer>
        <S.ArrowImg
          src='images/info/calendar-prev-btn.png'
          onClick={() => {
            const api = calendarRef.current.getApi();
            api.prev();
            const currentDate = api.currentData.dateProfile.currentDate;
            updateMonthAndDate(currentDate);

            console.log(api.getDate());
          }}
        />
        <S.Title>
          {year}년 {month}월
        </S.Title>
        <S.ArrowImg
          src='images/info/calendar-next-btn.png'
          onClick={() => {
            const api = calendarRef.current.getApi();
            api.next();
            const currentDate = api.currentData.dateProfile.currentDate;
            updateMonthAndDate(currentDate);
          }}
        />
      </S.TitleContainer>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        headerToolbar={false}
        initialDate={new Date(year, month - 1)}
        events={calendarData}
        eventContent={renderEventContent}
        eventBackgroundColor='white'
        eventBorderColor='white'
        titleFormat={(date) => `${date.date.year}년 ${date.date.month + 1}월`}
        dayHeaderContent={(date) => {
          let weekList = ['일', '월', '화', '수', '목', '금', '토'];
          return weekList[date.dow];
        }}
      />
    </S.TotalContainer>
  );
};

const renderEventContent = (eventInfo) => {
  const { itemType, eventType } = eventInfo.event.extendedProps;
  return (
    <S.Content>
      <S.TimeText color={getDotColor(eventType)}>
        {itemType === 'start' ? '시작' : '마감'}
      </S.TimeText>
      <S.TitleText>{eventInfo.event.title}</S.TitleText>
    </S.Content>
  );
};

export default CalendarView;
