import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import studyService from 'service/study_service';

export const useStudySearch = () => {
  const languageState = useSelector((state) => state.language);
  const accessToken = useSelector((state) => state.user.accessToken);
  const { selected, position, search, mode, isClosed, page } = languageState;
  const { data, isLoading, status } = useQuery(
    ['studyList', { selected, position, search, mode, isClosed, page, accessToken }],
    () => studyService.getListPagination(selected, page, position, mode, isClosed, search),
    {
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading, status, page };
};
