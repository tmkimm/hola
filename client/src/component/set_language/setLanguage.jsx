import React from 'react';
import TopBarContainer from 'component/top_bar_container/topBarContainer';
import styles from './setLanguage.module.css';
import { Selectbox } from 'component/select';
import { languageList } from 'common/options';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, setSignUpUser } from 'store/loginStep';
import { toast } from 'react-toastify';
import { addUserNickName } from 'store/user';

const SetLanguage = () => {
  const dispatch = useDispatch();
  const { nickName, id, position, workExperience, likeLanguages } = useSelector(
    (state) => state.loginStep,
  );

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
        마지막 단계에요!
        <br />
        관심있는 기술 스택을 선택해주세요.
      </h1>

      <div className={styles.inputWrapper}>
        <h3>관심 스택</h3>
        <div className={styles.likeLanguageWrapper}>
          <Selectbox
            isMulti={true}
            customStyles={customStyles}
            options={languageList}
            selectValue={likeLanguages}
            setSelectValue={({ key, value }) => {
              dispatch(setSignUpUser({ key, value }));
            }}
            maxValue={5}
            placeholder='React, Kotlin, Swift, Figma...'
            id='likeLanguages'
          />
        </div>
      </div>

      <button
        onClick={() => {
          if (likeLanguages.length === 0) {
            toast.info('관심 스택을 선택해 주세요!', {
              position: 'top-right',
              autoClose: 3000,
            });
            return;
          }
          dispatch(
            addUserNickName({
              id,
              nickName,
              image: 'default.PNG',
              position: position.value,
              workExperience: workExperience.value,
              likeLanguages: likeLanguages.map((lang) => lang.value),
            }),
          );
          dispatch(nextStep());
        }}
        className={styles.buttonNext}
        name='complete'
      >
        다음
      </button>
    </>
  );
};

export default SetLanguage;
