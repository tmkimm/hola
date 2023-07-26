import { useMutation } from 'react-query';
import studyService from 'service/study_service';

export const useUploadImage = () => {
  const { mutateAsync } = useMutation(({ preSignedUrl, imageFile, fileName }) =>
    studyService.uploadImageToS3(preSignedUrl, imageFile, fileName),
  );
  return mutateAsync;
};
