import React from "react";
import { useSelector } from "react-redux";
import LanguageBarItem from "../language_bar_item/languageBarItem";
import styles from "./languageBarList.module.css";

const LanguageBarList = React.memo(() => {
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
  const selectedLanguage = useSelector((state) => state.language);

  return (
    <ul className={styles.languageList}>
      {languages.map((language, i) => {
        let selected = selectedLanguage.includes(language);
        return (
          <LanguageBarItem
            Language={language}
            selected={selected}
            key={i}
          ></LanguageBarItem>
        );
      })}
    </ul>
  );
});

export default LanguageBarList;
