import React from "react";
import styles from "./dropdownBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { clearUser } from "../../store/user";
import authService from "../../service/auth_service";
import { nextStep } from "../../store/loginStep";
/* 

loginUser Component에서 DropDown bar button CLick시 rendering 되는 component로,
닉네임, 작성 글, 찜한 글, 로그아웃으로 구성되어 있습니다.

로그아웃의 경우 handleLogout을 통해 user를 초기화하는 과정을 진행하며
API를 통해 refresh token을 초기화 합니다.

*/

const DropdownBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then((response) => {
      console.log(response);
      localStorage.removeItem("userName");
      dispatch(clearUser());
      dispatch(nextStep("LOGIN"));
    });
  };
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
        <li className={styles.menuItem}>
          <Link to="/setting">설정</Link>
        </li>
        <li className={styles.menuItem} onClick={handleLogout}>
          로그아웃
        </li>
      </ul>
    </div>
  );
};

export default DropdownBar;
