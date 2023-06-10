import { useQuery } from 'react-query';
import studyService from 'service/study_service';

export const useGetLikesUser = (studyId) => {
  const { data, isLoading } = useQuery(
    ['api', 'likes', 'user'],
    () => {
      console.log('fetch like user..');
      return studyService.getLikesUser(studyId);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
  console.log('data : ', data);

  return { data, isLoading };
};
