import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLanguage, removeLanguage } from "../../store/language";
import LanguageBarItem from "../language_bar_item/languageBarItem";
import styles from "./languageBarList.module.css";

const LanguageBarList = React.memo(({ setChecked }) => {
  const selectedLanguage = useSelector((state) => state.language);

  useEffect(() => {
    setChecked(selectedLanguage.length === 14);
  }, [selectedLanguage.length, setChecked]);

  const dispatch = useDispatch();
  const onItemClick = useCallback(
    (Langauge, selected) => {
      if (!selected) dispatch(addLanguage(Langauge));
      else dispatch(removeLanguage(Langauge));
    },
    [dispatch]
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
