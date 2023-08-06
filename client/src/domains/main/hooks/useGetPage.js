import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import studyService from 'service/study_service';

export const useGetPage = () => {
  const languageState = useSelector((state) => state.language);
  const { selected, position, search, mode, isClosed, page, onOffLine } = languageState;
  const { data, isLoading } = useQuery(
    ['page', { selected, position, search, mode, isClosed, page, onOffLine }],
    () => studyService.getPageNumber(selected, page, position, mode, isClosed, search, onOffLine),
    {
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    },
  );

  return { pageData: data, isPageLoading: isLoading };
};
