import { useEffect } from 'react';

export const useBottomObserver = ({
  target, // 감지할 대상, ref를 넘길 예정
  onIntersect, // 감지 시 실행할 callback 함수
  root = null, // 교차할 부모 요소, 아무것도 넘기지 않으면 document가 기본이다.
  rootMargin = '0px', // root와 target이 감지하는 여백의 거리
  threshold = 0.2, // 임계점. 1.0이면 root내에서 target이 100% 보여질 때 callback이 실행된다.
  hasNextPage,
  isFetching,
}) => {
  useEffect(() => {
    if (!hasNextPage || isFetching) return;
    let observer;

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold });
      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold, root, onIntersect, hasNextPage, isFetching]);
};
