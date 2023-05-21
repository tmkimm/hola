import { useEffect } from 'react';

const useSocialShare = () => {
  const kakaoClientId = process.env.REACT_APP_KAKAO_LOGIN_API_KEY;

  useEffect(() => {
    const kakaoSDK = document.createElement('script');
    kakaoSDK.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    kakaoSDK.async = true;
    document.body.appendChild(kakaoSDK);

    return () => {
      document.body.removeChild(kakaoSDK);
    };
  }, []);

  const shareToKakaoTalk = ({ templateArgs, templateId }) => {
    if (window.Kakao === undefined) {
      return;
    }

    const kakao = window.Kakao;

    if (!kakao.isInitialized()) {
      kakao.init(kakaoClientId);
    }

    kakao.Share.sendCustom({
      templateId,
      templateArgs,
    });
  };

  return {
    shareToKakaoTalk,
  };
};

export default useSocialShare;
