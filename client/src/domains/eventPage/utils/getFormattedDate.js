import { format, getDay, getHours } from 'date-fns';

const getDayOfWeekKorean = (date) => {
  const dayOfWeek = getDay(date) + 1;
  const daysOfWeekKorean = ['일', '월', '화', '수', '목', '금', '토'];
  return daysOfWeekKorean[dayOfWeek - 1];
};

export const getFormattedDate = (dateString, skipYear = false) => {
  const dateTime = new Date(dateString);

  const date = format(dateTime, skipYear ? 'MM월 dd일' : 'yyyy년 MM월 dd일');
  const time = format(dateTime, 'HH:mm');
  const ampm = getHours(dateTime) >= 12 ? '오후' : '오전';

  if (ampm === '오전' && time === '00:00') return `${date} (${getDayOfWeekKorean(dateTime)})`;

  return `${date} (${getDayOfWeekKorean(dateTime)})\n${ampm} ${time}`;
};

export const getFormattedApplicationDate = (dateString) => {
  const dateTime = new Date(dateString);

  const date = format(dateTime, 'MM월 dd일');
  const time = format(dateTime, 'HH:mm');

  if (time === '00:00') return `${date}(${getDayOfWeekKorean(dateTime)})`;

  return `${date}(${getDayOfWeekKorean(dateTime)}) ${time}`;
};
