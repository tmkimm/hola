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

  const handleClick = () => {};

  return (
    <ul className={styles.languageList}>
      {languages.map((language) => (
        <LanguageBarItem
          Language={language}
          onItemClick={handleClick}
        ></LanguageBarItem>
      ))}
    </ul>
  );
};

export default LanguageBarList;
