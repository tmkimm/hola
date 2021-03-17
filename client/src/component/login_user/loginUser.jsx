import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./loginUser.module.css";
import { useSelector } from "react-redux";
import DropdownBar from "../dropdown_bar/dropdownBar";

const LoginUser = () => {
  const user = useSelector((state) => state.user);
  const [menuVisible, setMenuVisible] = useState(false);

  const menuRef = useRef();
  const handleLoginUserClick = () => {
    setMenuVisible((menuVisible) => !menuVisible);
  };

  const handleCloseMenu = useCallback(
    (e) => {
      if (
        menuVisible &&
        (!menuRef.current || !menuRef.current.contains(e.target))
      )
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
      <div className={styles.userName}>{user.name} 개발자</div>
      <img
        className={styles.userImg}
        src="https://media.vlpt.us/images/seeh_h/profile/6b7bfde5-b67c-4665-a2e1-a308e8de2059/tt.PNG?w=120"
        alt="thumbnail"
      />
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
};

export default LoginUser;
