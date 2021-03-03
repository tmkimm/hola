import React from "react";
import LanguageBarItem from "../language_bar_item/languageBarItem";
import styles from "./languageBarList.module.css";

const LanguageBarList = (props) => {
  const languages = [
    "Java",
    "Javascript",
    "Typescript",
    "Flutter",
    "Go",
    "C",
    "C++",
    "Python",
    "React",
    "Spring",
    "Vue",
    "Nodejs",
    "Django",
    "Swift",
    "Kotlin",
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
