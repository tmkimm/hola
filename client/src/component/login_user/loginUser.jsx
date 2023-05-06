import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './loginUser.module.css';
import { useSelector } from 'react-redux';
import DropdownBar from 'component/dropdown_bar/dropdownBar';

/* 

Navbar에서 user 정보가 있으면 rendering 되는 component로,
User 정보와 새 글쓰기, Dropdown Bar button을 rendering 합니다.

*/
const LoginUser = React.memo(() => {
  const user = useSelector((state) => state.user);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef();

  const handleLoginUserClick = () => {
    setMenuVisible((menuVisible) => !menuVisible);
  };

  const handleCloseMenu = useCallback(
    (e) => {
      if (menuVisible && (!menuRef.current || !menuRef.current.contains(e.target)))
        //dropdown이 켜져 있고 dropdown영역 외부 click시 dropdown menu 제거
        setMenuVisible(false);
    },
    [menuVisible, menuRef],
  );

  useEffect(() => {
    window.addEventListener('click', handleCloseMenu);
    return () => {
      window.removeEventListener('click', handleCloseMenu);
    };
  }, [handleCloseMenu]);

  return (
    <div className={styles.userWrapper} onClick={handleLoginUserClick}>
      <img className={styles.userImg} src={user.imageUrl} alt='userImg' />
      <svg
        strokeWidth='0'
        viewBox='0 0 24 24'
        height='16px'
        width='16px'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M7 10l5 5 5-5z'></path>
      </svg>
      {menuVisible && <DropdownBar></DropdownBar>}
    </div>
  );
});

export default LoginUser;
