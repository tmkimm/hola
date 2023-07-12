import { useMutation, useQueryClient } from 'react-query';
import userService from 'service/user_service';

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async ({ id, userData }) => {
      return await userService.modifyUserInfo(id, userData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['api', 'user', 'info']);
      },
    },
  );

  return { mutate };
};
