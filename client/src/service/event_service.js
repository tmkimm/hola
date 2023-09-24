import httpClient from './http_client';

/* 
공모전 관련 API를 정의한 class입니다.
*/

class Event {
  constructor(httpClient) {
    this.client = httpClient;
  }

  /* 추천 광고 영역 */
  recommend = () => {
    try {
      return this.client.get('events/recommend');
    } catch (error) {
      console.error(error);
    }
  };

  /* 공모전 광고 영역 */
  events = ({ page, eventType, search, onOffLine }) => {
    try {
      return this.client.get('events');
    } catch (error) {
      console.error(error);
    }
  };
}

const eventService = new Event(httpClient);
export default eventService;
