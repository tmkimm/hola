import { useQuery } from 'react-query';
import eventService from 'service/event_service';

export const useGetMainListEvent = (filterState) => {
  const queryKey = ['api', 'event', 'list', { ...filterState }];
  return useQuery(queryKey, () => eventService.events(filterState), {
    select: (data) => data.data,
  });
};
