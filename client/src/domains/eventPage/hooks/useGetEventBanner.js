import { C } from '@fullcalendar/core/internal-common';
import { useQuery } from 'react-query';
import adService from 'service/advertisement_service';

export const useGetEventBanner = () => {
  return useQuery(
    ['api', 'get', 'event', 'banner'],
    () => {
      return adService.getEventBanner();
    },
    {
      select: (data) => {
        return data.data;
      },
    },
  );
};
