import React, { useRef, useState, useEffect } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import * as S from './styled';
import './calendar.css';
import { useGetMainCalendarEvent } from 'domains/eventPage/hooks/useGetMainCalendarEvent';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from 'store/itFilter';

const CalendarView = () => {
  const itFilter = useSelector((state) => state.itFilter);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const [_, forceUpdate] = useState(0);
  const { data, isLoading } = useGetMainCalendarEvent({ year: 2023, month: 8 });
  const history = useHistory();

  return (
    <S.TotalContainer>
      <S.TitleContainer>
        <S.ArrowImg
          src='images/info/calendar-prev-btn.png'
          onClick={() => {
            const api = calendarRef.current.getApi();
            api.prev();
            forceUpdate((prev) => prev + 1);
            console.log(api.getDate());
          }}
        />
        <S.Title>{calendarRef.current?.getApi().currentData.viewTitle}</S.Title>
        <S.ArrowImg
          src='images/info/calendar-next-btn.png'
          onClick={() => {
            const api = calendarRef.current.getApi();
            api.next();
            forceUpdate((prev) => prev + 1);
            console.log(api);
          }}
        />
      </S.TitleContainer>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        headerToolbar={false}
        events={[
          { title: '시작 [구름 COMMIT] 관찰 가능성을 찾아 떠나는 SRE의 여정', date: '2023-09-13' },
          {
            title: '마감 [유데미x웅진씽크빅x스나이퍼팩토리] 프로젝트 캠프: 플러터',
            date: '2023-09-22',
          },
        ]}
        eventContent={renderEventContent}
        eventBackgroundColor='white'
        eventBorderColor='white'
        titleFormat={(date) => {
          // YYYY년 MM월
          return `${date.date.year}년 ${date.date.month + 1}월`;
        }}
        dayHeaderContent={(date) => {
          let weekList = ['일', '월', '화', '수', '목', '금', '토'];
          return weekList[date.dow];
        }}
      />
    </S.TotalContainer>
  );
};

function renderEventContent(eventInfo) {
  return <S.Content>{eventInfo.event.title}</S.Content>;
}

export default CalendarView;
