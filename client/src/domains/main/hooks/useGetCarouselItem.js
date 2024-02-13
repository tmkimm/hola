import { useQuery } from 'react-query';
import adService from 'service/advertisement_service';

export const useGetCarouselItem = () => {
  return useQuery(
    ['api', 'get', 'banner'],
    () => {
      return adService.getBanner();
    },
    {
      select: (data) => {
        // return data.data;
        return data.data.filter((d) => d._id !== '65cb7624c9cb7c177c881ab9');
      },
    },
  );
};
