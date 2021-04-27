import { useEffect } from "react";
import qs from "qs";
import { useHistory, useLocation } from "react-router";
import { fetchUserById } from "../../store/user";
import { useDispatch } from "react-redux";
import { setModalVisible, nextStep } from "../../store/loginStep";

const GithubLogin = () => {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const userData = { code, social: "github" };
      await dispatch(fetchUserById(userData)).then((response) => {
        if (response.payload.loginSuccess === false) {
          // signUp 진행
          dispatch(setModalVisible(true));
          dispatch(nextStep("SIGNUP"));
        }
        history.push("/");
      });
    };

    getToken();
  }, [history]);
  return null; // 이 부분에 로딩바와 같은 페이지를 렌더링 해도 좋아요.
};

export default GithubLogin;
