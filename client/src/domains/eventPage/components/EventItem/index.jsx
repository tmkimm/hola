import React, { useState } from 'react';
import { useModalState } from 'hooks/useModalCustom';
import EventDetailModal from '../EventDetailModal';
import EventItemView from '../EventItemView';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';

const EventItem = ({ eventInfo }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const history = useHistory();
  const { _id, eventType } = eventInfo;
  const [currentId, setCurrentId] = useState(_id);
  const { modalVisible, openModal, closeModal } = useModalState();
  return (
    <>
      <EventItemView
        eventInfo={eventInfo}
        onEventClick={() => {
          isMobile ? history.push(`/hola-it/${_id}`) : openModal();
        }}
      />
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
