import { useQuery } from 'react-query';
import eventService from 'service/event_service';

export const useGetEventDtail = (id) => {
  const queryKey = ['api', 'event', 'detail', id];

  return useQuery(queryKey, () => eventService.detail(id), {
    select: (data) => data.data,
  });
};
