import React, { useState } from "react";
import studyService from "../../service/study_service";
import styles from "./likesAndViews.module.css";

/* 

좋아요수와 조회수를 보여주는 component입니다.

To-do
api check 필요 -> 중복 id 들어감
해당 글 id 던지면 좋아요 수와 views만 return 받을 수 있는 api 있으면 좋을 것 같음

*/
const LikesAndViews = ({ views, likes, likeUser, studyId, userId }) => {
  const isLike = likeUser.filter((likeUserid) => likeUserid === userId);
  console.log(isLike.length);
  const initialImg = isLike.length === 0 ? "heart_unfilled" : "heart_filled";
  const [likeImg, setLikeImg] = useState(initialImg);

  const handleLikesClick = () => {
    console.log('studyId : ' + studyId);
    if (likeImg === "heart_filled") {
      studyService.addLikes(studyId);
      setLikeImg("heart_unfilled");
    } else {
      studyService.deleteLikes(studyId);
      setLikeImg("heart_filled");
    }
  };

  return (
    <section className={styles.likesAndViewsWrapper}>
      <div className={styles.likes}>
        <img
          onClick={handleLikesClick}
          className={styles.itemImg}
          src={`/images/info/${likeImg}.png`}
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
