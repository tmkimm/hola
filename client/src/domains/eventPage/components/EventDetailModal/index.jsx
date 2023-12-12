import Modal from 'component/modal/modal_component/modal';
import { useGetEventDtail } from 'domains/eventPage/hooks/useGetEventDetail';
import React from 'react';

import styles from './styles.module.css';
import {
  getFormattedApplicationDate,
  getFormattedDate,
} from 'domains/eventPage/utils/getFormattedDate';
import { HolaLogEvent } from 'common/GA';
import { getBadgeColor, getBadgeTitle } from 'domains/eventPage/utils/getBadgeTitle';

const EventDetailModal = ({ id, isOpen, closeModal }) => {
  const { data, isLoading } = useGetEventDtail(id);

  console.log(data);

  if (isLoading) return null;

  const {
    title,
    imageUrl,
    startDate,
    applicationStartDate,
    applicationEndDate,
    place,
    organization,
    link,
    content,
    eventType,
  } = data;

  return (
    <Modal visible={isOpen} name='eventInfo' onClose={closeModal}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{title}</h1>
        <section className={styles.eventInfoSection}>
          <img className={styles.eventBannerImg} src={imageUrl} alt='banner' />
          <div className={styles.eventInfo}>
            <div className={styles.eventInfoDetail}>
              <ul className={styles.badgeContainer}>
                <li
                  className={styles.badge}
                  style={{
                    color: getBadgeColor(eventType),
                    border: `1px solid ${getBadgeColor(eventType)}`,
                  }}
                >
                  {getBadgeTitle(eventType)}
                </li>
                <li className={styles.deadline}>🔥 마감 3일전</li>
              </ul>
              <div className={styles.evantInfoWrapper}>
                <span className={styles.eventTitle}>일시</span>
                <span className={styles.eventSubTitle}>{getFormattedDate(startDate)}</span>
              </div>

              <div className={styles.evantInfoWrapper}>
                <span className={styles.eventTitle}>신청</span>
                <span className={styles.eventSubTitle}>
                  <span className={styles.eventSubTitle}>{`${getFormattedApplicationDate(
                    applicationStartDate,
                  )} ~\n${getFormattedApplicationDate(applicationEndDate)}`}</span>
                </span>
              </div>

              <div className={styles.evantInfoWrapper}>
                <span className={styles.eventTitle}>장소</span>
                <span className={styles.eventSubTitle}>{place}</span>
              </div>
            </div>
            <div className={styles.eventApplyContainer}>
              <div className={styles.evantInfoWrapper}>
                <span className={styles.eventTitle}>주최</span>
                <span className={styles.eventSubTitle}>{organization}</span>
              </div>

              <button
                onClick={() => {
                  HolaLogEvent('hola_it_event_click', { cagtegory: title });
                  window.location.href = link;
                }}
                className={styles.applyButton}
              >
                💌 신청하기
              </button>
            </div>
          </div>
        </section>
        <div className={styles.introductionTitle}>소개</div>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />

        <div className={styles.recommendContentTitle}>📁 추천 콘텐츠</div>
      </div>
    </Modal>
  );
};

export default EventDetailModal;
