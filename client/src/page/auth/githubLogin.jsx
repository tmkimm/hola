import { useEffect } from "react";
import qs from "qs";
import { useHistory, useLocation } from "react-router";
import { fetchUserById } from "store/user";
import { useDispatch } from "react-redux";
import { setModalVisible, nextStep, setSignUpUser } from "store/loginStep";
import Modal from "component/modal/modal_component/modal";
import LoadingSpinner from "component/loading/loadingSpinner";

/* 

github login component 입니다.
github에서 popup login을 만들어 주지 않아 자체적으로 component를 만들었고,
code와 함께 redirection 되면 login 시도 후 main으로 이동합니다.


*/

const GithubLogin = () => {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = () => {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const userData = { code, social: "github" };
      dispatch(fetchUserById(userData)).then((response) => {
        const id = response.payload._id;
        if (response.payload.loginSuccess === false) {
          dispatch(setSignUpUser({ key: "id", value: id }));
          dispatch(setModalVisible(true));
          dispatch(nextStep());
        }
        history.push("/");
      });
    };

    getToken();
  }, [dispatch, history, location.search]);

  return (
    <Modal visible={true} name="loading">
      <LoadingSpinner />
    </Modal>
  );
};

export default GithubLogin;
