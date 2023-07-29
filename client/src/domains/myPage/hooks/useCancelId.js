import { useMutation } from 'react-query';
import userService from 'service/user_service';

export const useCancelId = () => {
  const { mutate } = useMutation((id) => {
    userService.deleteUser(id);
  });

  return mutate;
};
