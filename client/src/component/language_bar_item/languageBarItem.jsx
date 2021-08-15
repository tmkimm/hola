import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./languageBarItem.module.css";
import { addLanguage, removeLanguage } from "../../store/language";

const LanguageBarItem = React.memo(({ Language, selected }) => {
  const [isSelected, setIsSelected] = useState(selected);
  const displayType = isSelected === true ? styles.full : styles.transparent;
  console.log(selected);
  const dispatch = useDispatch();

  const onItemClick = useCallback(() => {
    if (!isSelected) dispatch(addLanguage(Language));
    else dispatch(removeLanguage(Language));
    setIsSelected((state) => !state);
  }, [dispatch, isSelected, Language]);

  return (
    <li className={styles.item}>
      <img
        className={`${styles.logo} ${displayType}`}
        onClick={onItemClick}
        src={`/images/languages/${Language}.png`}
        alt="language logo"
      />
    </li>
  );
});

export default LanguageBarItem;
