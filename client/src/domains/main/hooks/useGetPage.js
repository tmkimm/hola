import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import studyService from 'service/study_service';

export const useGetPage = () => {
  const languageState = useSelector((state) => state.language);
  const { selected, position, search, mode, isClosed, page } = languageState;
  const { data, isLoading } = useQuery(
    ['page', { selected, position, search, mode, isClosed, page }],
    () => studyService.getPageNumber(selected, page, position, mode, isClosed, search),
    {
      refetchOnWindowFocus: false,
    },
  );

  return { pageData: data, isPageLoading: isLoading };
};
