import React from "react";
import styles from "./avatar.module.css";

interface UserInfo {
  size: "small" | "large";
  userName: string;
  imgPath?: string;
}

function Avatar({ imgPath, userName, size }: UserInfo) {
  const displaySize = size === "small" ? styles.small : styles.large;
  const defaultImage =
    "https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG";
  return (
    <div className={styles.user}>
      <img
        className={`${styles.userImg} ${displaySize}`}
        src={imgPath || defaultImage}
        alt="avatar"
      />
      <div className={styles.userName}>{userName}</div>
    </div>
  );
}

export default Avatar;
