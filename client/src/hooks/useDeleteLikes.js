import { useMutation } from 'react-query';
import studyService from 'service/study_service';

export const useDeleteLikes = () => {
  const { mutateAsync, isLoading } = useMutation(async (studyId) => {
    await studyService.deleteLikes(studyId);
  });

  return { mutateAsync, isLoading };
};
