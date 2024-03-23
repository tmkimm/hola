import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import userService from 'service/user_service';

export const useGetUserLikes = (isLiked) => {
  const { id } = useSelector((state) => state.user);
  const queryKey = ['api', 'event', 'user', 'likes', id];

  return useQuery(queryKey, () => userService.getUserEventLikeList(id), {
    select: (data) => {
      console.log('d : ', data);
      return data.data;
    },
    enabled: !!id && !!isLiked,
  });
};
