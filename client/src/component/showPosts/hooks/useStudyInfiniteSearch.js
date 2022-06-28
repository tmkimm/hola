import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import studyService from 'service/study_service';

export const useStudyInfiniteSearch = (category, checked) => {
  const selectedLanguages = useSelector((state) => state.language.selected);
  const { data, error, fetchNextPage, hasNextPage, isFetching, status } = useInfiniteQuery(
    ['studyList', { category, selectedLanguages, checked }],
    async ({ pageParam = 0 }) => {
      const { data } = await studyService.getList(category, selectedLanguages, pageParam, !checked);

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
