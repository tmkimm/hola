import { useMutation } from 'react-query';
import adService from 'service/advertisement_service';

export const useEventLog = () => {
  return useMutation({ mutationFn: adService.eventLog });
};
