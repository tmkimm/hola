import { useMutation } from 'react-query';
import eventService from 'service/event_service';

export const useDeleteEventLikes = () => {
  return useMutation(eventService.deleteLikes);
};
