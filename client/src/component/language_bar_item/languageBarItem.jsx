import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./languageBarItem.module.css";
import { addLanguage, removeLanguage } from "../../store/language";

const LanguageBarItem = React.memo(({ Language, selected, onItemClick }) => {
  const displayType = selected === true ? styles.full : styles.transparent;

  return (
    <li className={styles.item}>
      <img
        className={`${styles.logo} ${displayType}`}
        onClick={() => onItemClick(Language, selected)}
        src={`/images/languages/${Language}.png`}
        alt={Language}
      />
    </li>
  );
});

export default LanguageBarItem;
