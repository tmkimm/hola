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
        <div className={styles.badgeWrapper}>
          <Badge state={study.type === '1' ? 'project' : 'study'} />
          <Badge state={study.state} />
        </div>
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
        <ul className={styles.content}>
          {studyLang.map((lang, i) => (
            <li key={i} className={styles.language}>
              <img
                className={styles.languageImage}
                title={lang}
                src={`/images/languages/${lang}.svg`}
                alt='language'
              />
            </li>
          ))}
        </ul>
        <div className={styles.border} />
        <section className={styles.info}>
          <div className={styles.userInfo}>
            <Avatar size='30px' imgPath={study.author.image}></Avatar>
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
        <img className={styles.bookmark} src={`/images/info/bookmark2.png`} alt='bookmark' />
      </li>
    </Link>
  );
};

export default StudyItem;
