import { useState } from "react";

/*

localStorage에 value를 저장하는 custom hook입니다.
key를 통해 data를 조회하고, 첫 전달시에만 initial Value를 참조합니다.

*/

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      console.log("get value from localStorage##### : ", JSON.parse(item));
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
