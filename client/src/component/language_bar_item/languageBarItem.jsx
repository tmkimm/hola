import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./languageBarItem.module.css";
import { addLanguage, removeLanguage } from "../../store/store";

const LanguageBarItem = ({ Language }) => {
  const [selected, setSelected] = useState(false);
  const displayType = selected === true ? styles.full : styles.transparent;

  const dispatch = useDispatch();

  const onItemClick = () => {
    setSelected((state) => !state);

    if (!selected) dispatch(addLanguage(Language));
    else dispatch(removeLanguage(Language));
  };

  return (
    <li className={styles.item}>
      <img
        className={`${styles.logo} ${displayType}`}
        onClick={onItemClick}
        src={`/images/languages/${Language}.png`}
        alt=""
      />
    </li>
  );
};

export default LanguageBarItem;
