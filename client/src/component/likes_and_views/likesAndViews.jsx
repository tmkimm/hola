import React from "react";
import styles from "./likesAndViews.module.css";
const LikesAndViews = ({ views, likes }) => {
  const handleLikesClick = () => {
    console.log("likes button clicked!");
  };

  return (
    <section className={styles.likesAndViewsWrapper}>
      <div className={styles.likes}>
        <img
          onClick={handleLikesClick}
          className={styles.itemImg}
          src="/images/info/heart_filled.png"
          alt="likes"
        />
        <p>{likes}</p>
      </div>
      <div className={styles.views}>
        <img
          className={styles.locationImg}
          src="/images/info/location.png"
          alt="location"
        />
        <p>{views}</p>
      </div>
    </section>
  );
};

export default LikesAndViews;
