import { useQuery } from 'react-query';
import studyService from 'service/study_service';

export const useGetLikesUser = (studyId) => {
  const { data, isLoading } = useQuery(
    ['api', 'likes', 'user'],
    () => {
      return studyService.getLikesUser(studyId);
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading };
};
