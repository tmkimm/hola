import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import eventService from 'service/event_service';

export const useGetMainListEventInfinite = (filterState) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const queryKey = ['api', 'event', 'list', accessToken, { ...filterState }];
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
