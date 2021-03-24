import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useHistory, useLocation } from "react-router";

const GithubLogin = () => {
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    async function getToken() {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      /*
      try {
        // 이 부분은 express에 요청하여 JWT 토큰을 발급합니다.
        const { access_token } = await axios.post(`http://localhost:3000/auth`, {
          code,
        });

        // 유저 JWT 토큰을 저장합니다.
        localStorage.setItem('access_token', access_token);
        history.push('/'); // 로그인이 완료되면 보여줄 페이지
      } catch (error) {
        history.push('/error'); // api요청이 실패했을때 애러 핸들링 페이지
      }
      */
    }

    getToken();
    history.push("/");
  }, [history, location]);
  return null; // 이 부분에 로딩바와 같은 페이지를 렌더링 해도 좋아요.
};

export default GithubLogin;
