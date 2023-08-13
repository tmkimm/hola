import { useEffect, useState } from 'react';

/* ios에서 bottom sheet background가 click 되는 이슈가 있어서 임시로 div를 만들어줍니다.
   @see https://github.com/stipsan/react-spring-bottom-sheet/issues/180 */
export const usePopupBackground = (isOpen) => {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowBackground(isOpen), 100);
  }, [isOpen]);

  return { showBackground };
};
