import { useQuery } from 'react-query';
import adService from 'service/advertisement_service';

export const useGetCarouselItem = () => {
  return useQuery(
    ['api', 'get', 'banner'],
    () => {
      return adService.getBanner();
    },
    {
      select: (data) => data.data,
    },
  );
};
