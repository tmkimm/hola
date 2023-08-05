import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import userService from 'service/user_service';

export const useGetMyLikes = (isLiked) => {
  const id = useSelector((state) => state.user.id);

  const { data, isLoading } = useQuery(
    ['api', 'posts', 'myLikes'],
    () => {
      return userService.getUserLikeList(id);
    },
    {
      enabled: isLiked,
      select: (data) => data.data,
    },
  );

  return { likeData: data, isLikeLoading: isLoading };
};
