import Modal from 'component/modal/modal_component/modal';
import { useGetEventDtail } from 'domains/eventPage/hooks/useGetEventDetail';
import React, { useEffect, useRef, useState } from 'react';

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
import { toast } from 'react-toastify';
import { useAddEventLikes } from 'domains/eventPage/hooks/useAddEventLikes';
import { useDeleteEventLikes } from 'domains/eventPage/hooks/useDeleteEventLikes';
import { useSelector } from 'react-redux';

const EventDetailModal = ({ id, isOpen, closeModal, eventType, onRecommendEventClick }) => {
  const scrollRef = useRef(null);
  const { data: detailData, isLoading } = useGetEventDtail(id);
  const { data: relativeEvents } = useGetRelativeEvent(id, eventType);
  const { mutate: addLikes } = useAddEventLikes();
  const { mutate: deleteLikes } = useDeleteEventLikes();
  const { id: userId } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);
  const mutateFn = liked ? deleteLikes : addLikes;

  useEffect(() => {
    setLiked(detailData?.isLiked);
  }, [detailData?.isLiked]);

  const copyAddress = async () => {
    HolaLogEvent(`event_copy_address`, { category: title });
    try {
      await navigator.clipboard.writeText(link);
      toast.success('클립보드에 주소가 복사되었어요!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      toast.error('복사에 실패했어요! 잠시후 다시 시도해보세요.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

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
    _id,
  } = detailData;

  const leftDays = differenceInDays(new Date(), new Date(applicationEndDate));

  return (
    <Modal visible={isOpen} name='eventInfo' onClose={closeModal}>
      <div className={styles.container}>
        <div className={styles.wrapper} ref={scrollRef}>
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
                  신청하기
                </button>
              </div>
            </div>
          </section>
          <div className={styles.introductionTitle}>소개</div>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />

          <div className={styles.recommendContentTitle}>📁 추천 콘텐츠</div>
          <div className={styles.recommendContainer}>
            {relativeEvents?.slice(0, 4).map((item, idx) => (
              <EventItemView
                key={idx}
                isRecommend={true}
                eventInfo={item}
                onEventClick={() => onRecommendEventClick(item._id)}
              />
            ))}
          </div>
        </div>
        <aside className={styles.tooltip}>
          <div
            className={styles.tooltipImgContainer}
            onClick={(e) => {
              e.stopPropagation();

              if (userId === undefined) {
                toast.info('로그인이 필요합니다.');
                return;
              }
              const toastText = liked ? '관심 목록에서 제거했어요!' : '관심 목록에 추가했어요!';
              setLiked((prev) => !prev);

              mutateFn(_id, {
                onSuccess: () => {
                  toast.success(toastText, {
                    position: 'top-right',
                    autoClose: 3000,
                  });
                },
                onError: () => {
                  setLiked((prev) => !prev);
                  toast.error('잠시 후 다시 시도해주세요', {
                    position: 'top-right',
                    autoClose: 3000,
                  });
                },
              });
            }}
          >
            <img
              className={styles.tooltipImg}
              alt='북마크'
              src={
                liked
                  ? '/images/event/event-bookmark-filled.png'
                  : '/images/event/event-bookmark.png'
              }
            />
            <span className={styles.tooltipText}>북마크</span>
          </div>

          <div className={styles.tooltipImgContainer} onClick={copyAddress}>
            <img className={styles.tooltipImg} alt='공유' src='/images/event/event-share.png' />
            <span className={styles.tooltipText}>공유</span>
          </div>
          <div
            className={styles.tooltipImgContainer}
            onClick={() => scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img className={styles.tooltipImg} alt='위로' src='/images/event/event-top.png' />
            <span className={styles.tooltipText}>TOP</span>
          </div>
        </aside>
        <button className={styles.prev}>
          <img src='/images/info/left-arrow-button.png' className={styles.prevNextImg} alt='이전' />
        </button>
        <button className={styles.next}>
          <img
            src='/images/info/right-arrow-button.png'
            className={styles.prevNextImg}
            alt='다음'
          />
        </button>
      </div>
    </Modal>
  );
};

export default EventDetailModal;
