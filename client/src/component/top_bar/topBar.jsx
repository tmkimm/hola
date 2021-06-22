import React from "react";
import styles from "./topBar.module.css";
const TopBar = (props) => {
  const handleClick = () => {
    console.log("clicked!");
  };

  return (
    <img
      className={styles.backButton}
      onClick={handleClick}
      src="/images/info/arrow-left.png"
      alt="back-button"
    />
  );
};

export default TopBar;
