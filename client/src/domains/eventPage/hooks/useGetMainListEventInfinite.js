import { useInfiniteQuery } from 'react-query';
import eventService from 'service/event_service';

export const useGetMainListEventInfinite = (filterState) => {
  const queryKey = ['api', 'event', 'list', { ...filterState }];
  return useInfiniteQuery(
    queryKey,
    (pageParams) => eventService.eventsInfinite(pageParams, filterState),
    {
      select: (data) => data.pages.flatMap((d) => d.data.data),
      getNextPageParam: (lastPage) => {
        if (lastPage.data.data.length === 0) return false;
        return lastPage.nextPage;
      },
    },
  );
};
