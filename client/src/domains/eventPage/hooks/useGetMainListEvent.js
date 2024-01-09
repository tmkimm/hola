import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import eventService from 'service/event_service';

export const useGetMainListEvent = (filterState) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const queryKey = ['api', 'event', 'list', accessToken, { ...filterState }];
  return useQuery(queryKey, () => eventService.events(filterState), {
    select: (data) => data.data,
  });
};
