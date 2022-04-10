import { useEffect } from 'react';
import qs from 'qs';
import { useHistory, useLocation } from 'react-router';
import { fetchUserById } from 'store/user';
import { useDispatch } from 'react-redux';
import { setModalVisible, nextStep, setSignUpUser } from 'store/loginStep';

const GithubLogin = () => {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = () => {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const userData = { code, social: 'github' };
      dispatch(fetchUserById(userData)).then((response) => {
        const id = response.payload._id;
        if (response.payload.loginSuccess === false) {
          dispatch(setSignUpUser({ key: 'id', value: id }));
          dispatch(setModalVisible(true));
          dispatch(nextStep());
        }
        history.push('/');
      });
    };

    getToken();
  }, [dispatch, history, location.search]);

  return null;
};

export default GithubLogin;
