import React from 'react';
import styles from './studyItem.module.css';
import { useHistory, Link } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { Avatar } from 'component/common/avatar';
import { formatDate } from 'common/utils';
import { positionsMap } from 'common/options';
import Badge from 'component/badge/badge';

const StudyItem = ({ study }) => {
  const studyLang = [];
  const displayType = study.isClosed ? styles.closed : styles.open;

  for (let i = 0; i < 5; i++) {
    if (study.language[i] === undefined) break;
    else studyLang.push(study.language[i]);
  }

  return (
    <Link to={`/study/${study._id}`} className={`${styles.studyItem} ${displayType}`}>
      <li>
        {study.state && <Badge state={study.state} />}
        <div className={styles.schedule}>
          <p className={styles.scheduleTitle}>마감일 |</p>
          <p className={styles.scheduleInfo}>{formatDate(study.startDate)}</p>
        </div>
        <h1 className={styles.title}>{study.title}</h1>
        <ul className={styles.positionList}>
          {study.positions.map((position, idx) => (
            <li key={idx} className={styles.position}>
              {positionsMap[position]}
            </li>
          ))}
        </ul>
        <ul className={styles.hashtag}>
          {study.hashTag.map((hashtag, idx) => (
            <li key={idx} className={styles.hashtagList}>
              #{hashtag === '10명 이상' ? '10명+' : hashtag}
            </li>
          ))}
        </ul>
        <ul className={styles.content}>
          {studyLang.map((lang, i) => (
            <li key={i} className={styles.language}>
              <img
                className={styles.languageImage}
                src={`/images/languages/${lang}.svg`}
                alt='language'
              />
            </li>
          ))}
        </ul>
        <section className={styles.info}>
          <div className={styles.userInfo}>
            <Avatar size='32px' imgPath={study.author.image}></Avatar>
            <div className={styles.userName}>{study.author.nickName}</div>
          </div>
          <div className={styles.viewsAndComment}>
            <div className={styles.infoItem}>
              <AiOutlineEye size={24} color={'#999999'} />
              <p className={styles.views}>{study.views}</p>
            </div>
            <div className={styles.infoItem}>
              <FaRegComment size={18} color={'#999999'} />
              <p className={styles.comments}>{study.totalComments}</p>
            </div>
          </div>
        </section>
        {study.isClosed && <div className={styles.closeNotice}>모집 마감</div>}
      </li>
    </Link>
  );
};

export default StudyItem;
