import httpClient from './http_client';
import { stringify } from 'qs';

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

  calendar = async ({ year, month, ...rest }) => {
    const queryString = stringify(rest);

    try {
      const response = await this.client.get(
        `/calendar/${year}/${month}` + (queryString ? `?${queryString}` : ''),
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}

const eventService = new Event(httpClient);
export default eventService;
