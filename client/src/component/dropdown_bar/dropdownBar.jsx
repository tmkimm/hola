import React from "react";
import styles from "./dropdownBar.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DropdownBar = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className={styles.menuWrapper}>
      <ul className={styles.menu}>
        <li className={styles.userName}>{user.name} 개발자</li>
        <li className={styles.menuItem}>
          <Link to="/list">내 작성글</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/list">찜한 글</Link>
        </li>
        <li className={styles.menuItem}>로그아웃</li>
      </ul>
    </div>
  );
};

export default DropdownBar;
