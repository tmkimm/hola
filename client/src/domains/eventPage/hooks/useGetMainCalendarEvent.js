import { useQuery } from 'react-query';
import eventService from 'service/event_service';

export const useGetMainCalendarEvent = ({ year, month, search, eventType, onOffline }) => {
  const queryKey = ['api', 'event', 'list', year, month, search, eventType, onOffline];
  return useQuery(
    queryKey,
    () => eventService.calendar({ year, month, search, eventType, onOffline }),
    {
      select: (data) => data.data,
      refetchOnWindowFocus: false,
    },
  );
};
