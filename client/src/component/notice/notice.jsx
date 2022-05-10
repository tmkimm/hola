import { NoticeDropdownBar } from 'component/noticeDropdown';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './notice.module.css';

export const Notice = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef();

  const handleNotificationClick = () => {
    // dropdown control
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
    <div className={styles.notificationWrapper} onClick={handleNotificationClick}>
      <img
        className={styles.notification}
        src={'/images/info/notification.svg'}
        alt='notification'
      />
      {menuVisible && <NoticeDropdownBar />}
    </div>
  );
};
