import ReactGA from 'react-ga4';

export const HolaLogEvent = (eventName, eventParams) => {
  const params = eventParams ?? {};
  ReactGA.event(eventName, params);
};
