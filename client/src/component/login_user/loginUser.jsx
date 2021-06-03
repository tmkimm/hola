import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./loginUser.module.css";
import { useSelector } from "react-redux";
import DropdownBar from "../dropdown_bar/dropdownBar";

/* 

Navbar에서 user 정보가 있으면 rendering 되는 component로,
User 정보와 새 글쓰기, Dropdown Bar button을 rendering 합니다.

*/
const LoginUser = React.memo(() => {
  const user = useSelector((state) => state.user);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(); // menuRef를 통해서 menu 영역이 click되었는지 판단하고, 외부 영역 클릭시 메뉴 사라짐

  const handleLoginUserClick = () => {
    // dropdown control
    setMenuVisible((menuVisible) => !menuVisible);
  };

  const handleCloseMenu = useCallback(
    (e) => {
      if (
        menuVisible &&
        (!menuRef.current || !menuRef.current.contains(e.target))
      )
        //dropdown이 켜져 있고 dropdown영역 외부 click시 dropdown menu 제거
        setMenuVisible(false);
    },
    [menuVisible, menuRef]
  );

  useEffect(() => {
    window.addEventListener("click", handleCloseMenu);
    return () => {
      window.removeEventListener("click", handleCloseMenu);
    };
  }, [handleCloseMenu]);

  return (
    <div className={styles.userWrapper} onClick={handleLoginUserClick}>
      <div className={styles.userName}>{user.nickName}</div>
      <img className={styles.userImg} src={user.imageUrl} alt="userImg" />
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7 10l5 5 5-5z"></path>
      </svg>
      {menuVisible && <DropdownBar ref={menuRef}></DropdownBar>}
    </div>
  );
});

export default LoginUser;
