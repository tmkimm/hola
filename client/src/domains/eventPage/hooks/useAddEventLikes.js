import { useMutation } from 'react-query';
import eventService from 'service/event_service';

export const useAddEventLikes = () => {
  return useMutation(eventService.addLikes);
};
