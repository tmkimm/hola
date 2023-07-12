import { useQuery } from 'react-query';
import userService from 'service/user_service';

export const useGetUserInfo = (id) => {
  const { data, isLoading } = useQuery(
    ['api', 'user', 'info', id],
    () => {
      return userService.getUserInfo(id);
    },
    {
      select: (data) => data.data,
    },
  );

  return { data, isLoading };
};
