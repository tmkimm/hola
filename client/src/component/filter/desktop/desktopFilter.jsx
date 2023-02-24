import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './desktopFilter.module.css';
import {
  addLanguage,
  clearLanguage,
  initLanguage,
  removeLanguage,
  changeSubject,
} from 'store/language';
import { languageMap } from 'common/options';
import Category from '../category/Category';
import LanguageBar from 'component/languageIBar/LanguageBar';
import SelectedLanguage from '../selectedLanguage/SelectedLanguage';
import Search from 'component/search/search';

export const DesktopFilter = React.memo(() => {
  const { selected } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const onIconClick = useCallback(
    (Langauge, isSelected) => {
      if (!isSelected) dispatch(addLanguage(languageMap[Langauge]));
      else {
        selected.length === 1
          ? dispatch(initLanguage())
          : dispatch(removeLanguage(languageMap[Langauge]));
      }
    },
    [dispatch, selected.length],
  );

  const onDeleteIconClick = (selected) => {
    dispatch(removeLanguage(selected));
  };
  const onCategoryClick = (curSubject) => {
    dispatch(changeSubject(curSubject));
  };

  const onResetFilterClick = () => {
    dispatch(clearLanguage());
  };

  return (
    <section className={styles.filterWrapper}>
      <Category onCategoryClick={onCategoryClick} />
      <LanguageBar onIconClick={onIconClick} />
      <SelectedLanguage
        onDeleteIconClick={onDeleteIconClick}
        onResetFilterClick={onResetFilterClick}
      />
      <Search />
    </section>
  );
});
