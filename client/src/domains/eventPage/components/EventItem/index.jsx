import React, { useState } from 'react';
import { useModalState } from 'hooks/useModalCustom';
import EventDetailModal from '../EventDetailModal';
import EventItemView from '../EventItemView';

const EventItem = ({ eventInfo }) => {
  const { _id, eventType } = eventInfo;
  const [currentId, setCurrentId] = useState(_id);
  const { modalVisible, openModal, closeModal } = useModalState();
  return (
    <>
      <EventItemView eventInfo={eventInfo} onEventClick={() => openModal()} />
      {modalVisible && (
        <EventDetailModal
          id={currentId}
          onRecommendEventClick={setCurrentId}
          isOpen={modalVisible}
          closeModal={closeModal}
          eventType={eventType}
          eventInfo={eventInfo}
        />
      )}
    </>
  );
};

export default EventItem;
