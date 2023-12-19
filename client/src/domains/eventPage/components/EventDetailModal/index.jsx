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
import { differenceInDays } from 'date-fns';
import { useGetRelativeEvent } from 'domains/eventPage/hooks/useGetRelativeEvent';
import EventItemView from '../EventItemView';

const EventDetailModal = ({ id, isOpen, closeModal, eventType, onRecommendEventClick }) => {
  const { data: detailData, isLoading } = useGetEventDtail(id);
  const { data: relativeEvents } = useGetRelativeEvent(id, eventType);

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
  } = detailData;

  const leftDays = differenceInDays(new Date(), new Date(applicationEndDate));

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
                {leftDays > 0 && (
                  <li className={styles.deadline}>
                    🔥 마감 {differenceInDays(new Date(), new Date(applicationEndDate))}일전
                  </li>
                )}
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
        <div className={styles.recommendContainer}>
          {relativeEvents?.slice(0, 4).map((item) => (
            <EventItemView
              isRecommend={true}
              eventInfo={item}
              onEventClick={() => onRecommendEventClick(item._id)}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default EventDetailModal;
