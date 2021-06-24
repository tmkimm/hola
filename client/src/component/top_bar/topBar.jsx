import React from "react";
import { useDispatch } from "react-redux";
import { previousStep } from "../../store/loginStep";
import styles from "./topBar.module.css";
const TopBar = ({ handleClick }) => {
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
