import React from "react";
import LanguageBarItem from "../language_bar_item/languageBarItem";
import styles from "./languageBarList.module.css";

const LanguageBarList = React.memo(() => {
  const languages = [
    "javascript",
    "typescript",
    "react",
    "vue",
    "nodejs",
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

  return (
    <ul className={styles.languageList}>
      {languages.map((language, i) => (
        <LanguageBarItem Language={language} key={i}></LanguageBarItem>
      ))}
    </ul>
  );
});

export default LanguageBarList;
