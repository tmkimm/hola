import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import studyService from 'service/study_service';

export const useStudyInfiniteSearch = (category, checked) => {
  const languageState = useSelector((state) => state.language);
  const { selected, position } = languageState;

  console.log(position);
  const { data, error, fetchNextPage, hasNextPage, isFetching, status } = useInfiniteQuery(
    ['studyList', { category, selected, checked }],
    async ({ pageParam = 0 }) => {
      const { data } = await studyService.getList(
        category,
        selected,
        position,
        pageParam,
        !checked,
      );

      return {
        result: data,
        nextPage: pageParam + 20,
        isLast: data.length === 0 ? true : false,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.isLast) return false;
        return lastPage.nextPage;
      },
      refetchOnWindowFocus: false,
    },
  );

  return { isFetching, error, data, hasNextPage, fetchNextPage, status };
};
