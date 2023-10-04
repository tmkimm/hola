import { useQuery } from 'react-query';
import eventService from 'service/event_service';

export const useGetMainCalendarEvent = ({ year, month, search, eventType }) => {
  const queryKey = ['api', 'event', 'list', year, month, search, eventType];
  return useQuery(queryKey, eventService.calendar({ year, month, search, eventType }));
};
