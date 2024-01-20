import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import studyService from 'service/study_service';

export const useStudySearch = () => {
  const languageState = useSelector((state) => state.language);
  const { selected, position, search, mode, isClosed, page, onOffLine } = languageState;
  const { data, isLoading, status } = useQuery(
    ['studyList', { selected, position, search, mode, isClosed, page, onOffLine }],
    () =>
      studyService.getListPagination(selected, page, position, mode, isClosed, search, onOffLine),
    {
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    },
  );

  return { commonData: data, isLoading, status, page };
};
