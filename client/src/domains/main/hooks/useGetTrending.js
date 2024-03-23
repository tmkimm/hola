import { useQuery } from 'react-query';
import studyService from 'service/study_service';

export const useGetTrending = () => {
  const queryKey = ['api', 'study', 'trending'];
  return useQuery(queryKey, studyService.getTrendings, {
    select: (data) => data.data,
  });
};
