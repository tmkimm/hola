import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import studyService from 'service/study_service';
import { changeLastId } from '../../../store/language';

export const useStudySearch = () => {
  const languageState = useSelector((state) => state.language);
  const accessToken = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();
  const { selected, position, search, mode, isClosed, page, previousPage, lastId } = languageState;
  const { data, isLoading, status } = useQuery(
    ['studyList', { selected, position, search, mode, isClosed, page, previousPage, accessToken }],
    () =>
      studyService.getListPagination(
        selected,
        page,
        previousPage,
        lastId,
        position,
        mode,
        isClosed,
        search,
      ),
    {
      onSuccess: (data) => {
        const {
          data: { posts },
        } = data;
        const lastData = posts.at(-1);
        dispatch(changeLastId(lastData._id));
      },
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading, status, page, previousPage, lastId };
};
