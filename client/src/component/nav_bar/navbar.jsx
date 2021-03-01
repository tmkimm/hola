import React from "react";
import styles from "./navbar.module.css";
const Navbar = (props) => {
  return (
    <nav className={styles.navbar}>
      <img
        className={styles.logo}
        src="/images/logo/hola_logo_w.png"
        alt="logo"
      />
      <button className={styles.login}>로그인</button>
    </nav>
  );
};

export default Navbar;
