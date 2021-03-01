import React from "react";
import styles from "./languageBarItem.module.css";

const LanguageBarItem = ({ Language, onItemClick }) => {
  const a = 1;
  console.log(a);

  return (
    <li className={styles.item}>
      <img
        className={styles.img}
        onClick={(e) => {
          onItemClick(e);
        }}
        src={`/images/languages/${Language}.png`}
        alt=""
      />
    </li>
  );
};

export default LanguageBarItem;
