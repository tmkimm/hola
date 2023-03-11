import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import studyService from 'service/study_service';

export const useStudySearch = () => {
  const languageState = useSelector((state) => state.language);
  const { selected, position, search, mode, visibleOpenOnly, page, previousPage, lastId } =
    languageState;
  return useQuery(
    [
      'studyList',
      { selected, position, search, mode, visibleOpenOnly, page, previousPage, lastId },
    ],
    () =>
      studyService.getListPagination(
        selected,
        page,
        previousPage,
        lastId,
        position,
        mode,
        visibleOpenOnly,
        search,
      ),
  );
};
