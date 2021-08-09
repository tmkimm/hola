import React, { useRef, useState } from "react";
import styles from "./rating.module.css";
import ReactStars from "react-rating-stars-component";
import userService from "../../service/user_service";
import { toast } from "react-toastify";

const Rating = (props) => {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [imageName, setImageName] = useState("score_3");

  const inputRef = useRef();

  const ratingChanged = (score) => {
    setRating(score);
    setImageName(`score_${Math.round(score)}`);
  };
  const handleClick = () => {
    setShowRating((state) => !state);
  };
  const onSubmit = async () => {
    await userService.submitFeedback({
      rating,
      content: inputRef.current.value,
    });
    setShowRating((state) => !state);
    toast.success("피드백이 제출되었어요!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  return (
    <>
      {showRating ? (
        <section className={styles.container}>
          <header className={styles.header}>
            <div className={styles.exitWrapper} onClick={handleClick}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                tabIndex="1"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </div>
            <div className={styles.titleWrapper}>
              <div className={styles.title}>Hola에 만족하셨나요?</div>
              <div className={styles.content}>
                더 좋은 서비스를 위해, 평가를 남겨주세요!
              </div>
            </div>
          </header>
          <div className={styles.imgWrapper}>
            <img
              className={styles.imgLogo}
              src={`/images/ratings/${imageName}.png`}
              alt="default logo"
            />
          </div>

          <div className={styles.ratings}>
            <ReactStars
              isHalf={true}
              count={5}
              onChange={ratingChanged}
              size={48}
              activeColor="#ffd700"
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="textbox"
              placeholder="평가를 입력해주세요..."
              ref={inputRef}
            />
            <button className={styles.submitButton} onClick={onSubmit}>
              제출하기
            </button>
          </div>
        </section>
      ) : (
        <div className={styles.ratingIcon}>
          <img
            className={styles.ratingIconImg}
            src="/images/logo/rating.png"
            alt="default"
            onClick={handleClick}
          />
        </div>
      )}
    </>
  );
};

export default Rating;
