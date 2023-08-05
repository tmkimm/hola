import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Category.module.css';
import { changeSubject } from 'store/language';

const Category = () => {
  const categories = ['인기', '프론트엔드', '백엔드', '모바일', '기타', '모두보기'];
  const dispatch = useDispatch();
  const { subject: curCategory } = useSelector((state) => state.language);
  return (
    <ul className={styles.categories}>
      {categories.map((category, idx) => (
        <li
          key={idx}
          className={`${styles.categoryItem} ${
            category === curCategory ? styles.selectedCategory : ''
          }`}
          onClick={() => {
            dispatch(changeSubject(category));
          }}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Category;
