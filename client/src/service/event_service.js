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
  events = ({ page, eventType, search, onOffline, sort }) => {
    const queryString = stringify(
      {
        page,
        eventType: eventType === 'all' ? null : eventType,
        sort: sort === 'RECENT' ? '-createAt' : '-views',
        onOffline,
        search,
      },
      { skipNulls: true },
    );

    try {
      return this.client.get(`events?${queryString}`);
    } catch (error) {
      console.error(error);
    }
  };

  /* 공모전 광고 영역 */
  eventsInfinite = async ({ pageParam = 1 }, { eventType, search, onOffline, sort }) => {
    const queryString = stringify(
      {
        page: pageParam,
        eventType: eventType === 'all' ? null : eventType,
        sort: sort === 'RECENT' ? '-createAt' : '-views',
        onOffline,
        search,
      },
      { skipNulls: true },
    );

    try {
      const data = await this.client.get(`events?${queryString}`);
      return {
        data,
        nextPage: pageParam + 1,
      };
    } catch (error) {
      console.error(error);
    }
  };

  calendar = async ({ year, month, eventType, search, onOffline }) => {
    const queryString = stringify({ eventType, search, onOffline }, { skipNulls: true });

    try {
      const response = await this.client.get(
        `events/calendar/${year}/${month}${queryString ? `?${queryString}` : ''}`,
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  /* 이벤트 상세 */
  detail = (id) => this.client.get(`events/${id}`);

  /* 이벤트 상세 */
  relativeEvent = (id, eventType) =>
    this.client.get(`events/${id}/recommend?eventType=${eventType}`);

  addLikes = (eventId) => {
    this.client.post('events/likes', {
      eventId,
    });
  };

  deleteLikes = (eventId) => {
    this.client.delete(`events/likes/${eventId}`);
  };
}

const eventService = new Event(httpClient);
export default eventService;
