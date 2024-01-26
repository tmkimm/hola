import httpClient from './http_client';

/* 
광고 관련 API 정의
*/

class Advertisement {
  constructor(httpClient) {
    this.client = httpClient;
  }

  /* 메인베너 조회 */
  getBanner = () => {
    return this.client.get('advertisements/banner');
  };

  /* 공모전 배너 조회 */
  getEventBanner = () => {
    return this.client.get('advertisements/eventBanner');
  };

  /* 광고 추적 로깅 */
  eventLog = ({ advertisementId, logType }) => {
    //if (window.location.href.includes('localhost')) return;
    return this.client.post('advertisements/event-log', {
      advertisementId,
      logType,
    });
  };
}

const adService = new Advertisement(httpClient);
export default adService;
