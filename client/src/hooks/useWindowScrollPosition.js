import React, { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useWindowScrollPosition = (pageName, loading) => {
  const [scrollYStorage, setScrollYStorage] = useLocalStorage(pageName, 0);

  useEffect(() => {
    if (!loading) {
      //console.log("scroll to : ", scrollYStorage);
      window.scrollTo(0, scrollYStorage);
    }
  }, [scrollYStorage, loading]);

  // useEffect(() => {
  //   return () => {
  //     //setScrollYStorage(window.scrollY);
  //   };
  // }, [setScrollYStorage]);
};

export default useWindowScrollPosition;
