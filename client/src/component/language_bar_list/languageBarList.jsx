import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLanguage,
  clearLanguage,
  initLanguage,
  removeLanguage,
} from "store/language";
import LanguageBarItem from "component/language_bar_item/languageBarItem";
import styles from "./languageBarList.module.css";

const LanguageBarList = React.memo(({ setChecked }) => {
  const selectedLanguage = useSelector((state) => state.language);

  useEffect(() => {
    setChecked(selectedLanguage.length === 14);
  }, [selectedLanguage.length, setChecked]);

  const dispatch = useDispatch();
  const onItemClick = useCallback(
    (Langauge, selected) => {
      if (selectedLanguage.length === 14) {
        dispatch(clearLanguage());
        dispatch(addLanguage(Langauge));
      } else if (selectedLanguage.length === 1) {
        if (!selected) dispatch(addLanguage(Langauge));
        else dispatch(initLanguage());
      } else {
        if (!selected) dispatch(addLanguage(Langauge));
        else dispatch(removeLanguage(Langauge));
      }
    },
    [dispatch, selectedLanguage.length]
  );

  const languages = [
    "javascript",
    "typescript",
    "react",
    "vue",
    "node.js",
    "java",
    "spring",
    "kotlin",
    "c++",
    "go",
    "python",
    "django",
    "flutter",
    "swift",
  ];

  //console.log(selectedLanguage);
  return (
    <ul className={styles.languageList}>
      {languages.map((language, i) => {
        let selected = selectedLanguage.includes(language);
        return (
          <LanguageBarItem
            Language={language}
            selected={selected}
            onItemClick={onItemClick}
            key={i}
          ></LanguageBarItem>
        );
      })}
    </ul>
  );
});

export default LanguageBarList;
