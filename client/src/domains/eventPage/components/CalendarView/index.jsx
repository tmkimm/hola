import React, { useRef, useState } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import * as S from './styled';
import './calendar.css';

const CalendarView = () => {
  const calendarRef = useRef(null);
  const [_, forceUpdate] = useState(0);

  return (
    <S.TotalContainer>
      <S.TitleContainer>
        <S.ArrowImg
          src='images/info/calendar-prev-btn.png'
          onClick={() => {
            const api = calendarRef.current.getApi();
            api.prev();
            forceUpdate((prev) => prev + 1);
            console.log(api);
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
          { title: '[구름 COMMIT] 관찰 가능성을 찾아 떠나는 SRE의 여정', date: '2023-09-13' },
          { title: '[유데미x웅진씽크빅x스나이퍼팩토리] 프로젝트 캠프: 플러터', date: '2023-09-22' },
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
