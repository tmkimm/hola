import React, { useState } from "react";
import studyService from "../../service/study_service";
import styles from "./likesAndViews.module.css";

/* 

좋아요수와 조회수를 보여주는 component입니다.

To-do
api check 필요 -> 중복 id 들어감
해당 글 id 던지면 좋아요 수와 views만 return 받을 수 있는 api 있으면 좋을 것 같음

삭제 제대로 되고 있는지 확인 필요
StudyContent에서 read, user redux 정보를 다 전달 받고 있는데, 
이거 제대로 된 구조인지 생각필요

*/

const LikesAndViews = ({ views, totalLikes, likeUser, studyId, userId }) => {
  const isLike = likeUser.filter((likeUserid) => likeUserid === userId);
  console.log(isLike.length);
  console.log("likeUser: ", likeUser);
  const initialImg = isLike.length === 0 ? "heart_unfilled" : "heart_filled";
  const [likeImg, setLikeImg] = useState(initialImg);
  const [likeCount, setLikeCount] = useState(totalLikes);

  const handleLikesClick = async () => {
    console.log("studyId : " + studyId);
    if (likeImg === "heart_filled") {
      const response = await studyService.deleteLikes(studyId);
      console.log("delete like response: ", response);
      setLikeImg("heart_unfilled");
      setLikeCount((state) => state - 1);
    } else {
      const response = await studyService.addLikes(studyId);
      console.log("add like response : ", response);
      setLikeCount((state) => state + 1);
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
        <p>{likeCount}</p>
      </div>
      <div className={styles.views}>
        <img className={styles.eyeImg} src="/images/info/eye.png" alt="views" />
        <p>{views}</p>
      </div>
    </section>
  );
};

export default LikesAndViews;
