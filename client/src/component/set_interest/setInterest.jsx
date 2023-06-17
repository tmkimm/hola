import React from 'react';
import TopBarContainer from 'component/top_bar_container/topBarContainer';
import styles from './setInterest.module.css';
import { Selectbox } from 'component/select';
import { positionsExceptAllOption, workExperienceOption } from 'common/options';

const SetInterest = ({ loginStep, handleLoginStep, handleFields }) => {
  const customStyles = {
    control: (css) => ({
      ...css,
      maxWidth: '500px',
      width: '100%',
      minHeight: '3rem',
    }),
  };

  return (
    <>
      <TopBarContainer />
      <h1 className={styles.title}>
        {loginStep.nickName}님, 반가워요.
        <br />
        직무와 경력을 알려주세요.
      </h1>

      <div className={styles.inputWrapper}>
        <h3>직무</h3>
        <div className={styles.likeLanguageWrapper}>
          <Selectbox
            customStyles={customStyles}
            options={positionsExceptAllOption}
            selectValue={loginStep.position}
            setSelectValue={handleFields}
            maxValue={3}
            placeholder='프론트엔드, 백엔드, 디자이너, PM...'
            id='position'
          />
        </div>
      </div>
      <div className={styles.careerWrapper}>
        <h3>경력</h3>
        <div className={styles.likeLanguageWrapper}>
          <Selectbox
            customStyles={customStyles}
            options={workExperienceOption}
            selectValue={loginStep.workExperience}
            setSelectValue={handleFields}
            maxValue={3}
            placeholder='0년, 1년, 2년...'
            id='workExperience'
          />
        </div>
      </div>

      <button onClick={handleLoginStep} className={styles.buttonNext} name='complete'>
        다음
      </button>
    </>
  );
};

export default SetInterest;
