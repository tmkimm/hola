import { useQuery } from 'react-query';
import eventService from 'service/event_service';

export const useGetRelativeEvent = (id, eventType) => {
  const queryKey = ['api', 'event', 'detail', 'relative', id];

  return useQuery(queryKey, () => eventService.relativeEvent(id, eventType), {
    select: (data) => data.data,
    enabled: !!eventType,
  });
};
