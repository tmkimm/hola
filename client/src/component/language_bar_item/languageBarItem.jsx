import React from "react";
import styles from "./languageBarItem.module.css";

const LanguageBarItem = React.memo(({ Language, selected, onItemClick }) => {
  const displayType = selected === true ? styles.full : styles.transparent;

  return (
    <li className={styles.item}>
      <img
        className={`${styles.logo} ${displayType}`}
        onClick={() => onItemClick(Language, selected)}
        src={`/images/languages/${Language}.svg`}
        alt={Language}
      />
    </li>
  );
});

export default LanguageBarItem;
