import { useQuery } from 'react-query';
import eventService from 'service/event_service';

export const useGetRecommendEvents = () => {
  const queryKey = ['api', 'event', 'recommend'];
  return useQuery(queryKey, eventService.recommend, {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });
};
