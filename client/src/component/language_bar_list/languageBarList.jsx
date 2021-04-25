import React from "react";
import LanguageBarItem from "../language_bar_item/languageBarItem";
import styles from "./languageBarList.module.css";

const LanguageBarList = (props) => {
  const languages = [
    "java",
    "javascript",
    "typescript",
    "flutter",
    "go",
    "c",
    "c++",
    "python",
    "react",
    "spring",
    "vue",
    "nodejs",
    "django",
    "swift",
    "kotlin",
  ];

  return (
    <ul className={styles.languageList}>
      {languages.map((language, i) => (
        <LanguageBarItem Language={language} key={i}></LanguageBarItem>
      ))}
    </ul>
  );
};

export default LanguageBarList;
