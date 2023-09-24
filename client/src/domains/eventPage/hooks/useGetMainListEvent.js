import { useQuery } from 'react-query';
import eventService from 'service/event_service';

export const useGetMainListEvent = () => {
  const queryKey = ['api', 'event', 'list'];
  return useQuery(queryKey, eventService.events, {
    select: (data) => data.data,
  });
};
