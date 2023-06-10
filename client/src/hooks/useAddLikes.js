import { useMutation } from 'react-query';
import studyService from 'service/study_service';

export const useAddLikes = () => {
  const { mutateAsync, isLoading } = useMutation(async (studyId) => {
    return await studyService.addLikes(studyId);
  });

  return { mutateAsync, isLoading };
};
