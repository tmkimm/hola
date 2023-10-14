import { IT_FILTER } from 'store/itFilter';

export const getDotColor = (eventType) => {
  switch (eventType) {
    case IT_FILTER.TYPE.CONFERENCE:
      return '#4A5E75';
    case IT_FILTER.TYPE.HACKATHON:
      return '#1E75FF';
    case IT_FILTER.TYPE.BOOTCAMP:
      return '#00B488';
    case IT_FILTER.TYPE.CONTEST:
      return '#6E3EF5';
    default:
      throw new Error('invalid event type');
  }
};
