import React, { useState } from 'react';
import { useModalState } from 'hooks/useModalCustom';
import EventDetailModal from '../EventDetailModal';
import EventItemView from '../EventItemView';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeQueryString } from 'domains/eventPage/utils/makeQueryString';

const EventItem = ({ eventInfo, getNextId, getPrevId }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const history = useHistory();
  const { _id, eventType } = eventInfo;
  const [currentId, setCurrentId] = useState(_id);
  const filterState = useSelector((state) => state.itFilter);
  const { modalVisible, openModal, closeModal } = useModalState();

  const handleClose = () => {
    window.history.replaceState(null, 'modal title', `/hola-it?${makeQueryString(filterState)}`);
    closeModal();
  };

  return (
    <>
      <EventItemView
        isOverlayNeeded
        eventInfo={eventInfo}
        onEventClick={() => {
          if (isMobile) {
            history.push(`/hola-it/${_id}`);
            return;
          }
          window.history.replaceState(null, 'modal title', `/hola-it/${_id}`);
          openModal();
        }}
      />
      {modalVisible && (
        <EventDetailModal
          id={currentId}
          setCurrentId={setCurrentId}
          isOpen={modalVisible}
          closeModal={handleClose}
          eventType={eventType}
          getNextId={getNextId}
          getPrevId={getPrevId}
        />
      )}
    </>
  );
};

export default EventItem;
