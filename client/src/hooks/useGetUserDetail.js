import { useQuery } from 'react-query';

export const useGetUserDetail = () => {
  const {} = useQuery(['api', 'user', 'detail']);
};
