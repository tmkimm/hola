import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import studyService from "../../service/study_service";
import styles from "./recommendPost.module.css";

const RecommendPost = ({ id }) => {
  const [posts, setPosts] = useState([]);
  const nickname = useSelector((state) => state.user.nickName) || "방문자";
  const history = useHistory();
  useEffect(() => {
    studyService.getRecommendedPost(id).then((data) => setPosts(data));
  }, [id]);

  const onclick = (id) => {
    history.push(`/study/${id}`);
  };

  return (
    <div className={styles.totalWrapper}>
      <div className={styles.recommendWrapper}>
        <div className={styles.userInfoWrapper}>
          <div className={styles.bar}></div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{nickname}</span>
            님이
            <br />
            좋아하실 글을 모아봤어요!
          </div>
        </div>
        <ul className={styles.listWrapper}>
          {posts.map((post, idx) => (
            <li
              className={styles.postList}
              key={post._id}
              onClick={() => onclick(post._id)}
            >
              <div className={styles.index}>{`${idx + 1}.`}</div>
              <div className={styles.title}>{post.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecommendPost;
