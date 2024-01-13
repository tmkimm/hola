import { useEffect, useState } from 'react';

export const useOnScreen = (target) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root: document,
        rootMargin: '100px 0px 0px 0px',
      },
    );

    io.observe(target);

    return () => io.disconnect();
  }, [target]);

  return inView;
};
