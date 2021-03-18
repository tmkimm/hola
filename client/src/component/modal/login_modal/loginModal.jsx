import styles from "./loginModal.module.css";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { fetchUserById } from "../../../store/user";
import DropdownBar from "../../dropdown_bar/dropdownBar";
import GoogleButton from "../../login_button/google_button/googleButton";

const LoginModal = ({ handleClose }) => {
  const clientId = process.env.REACT_APP_GOOGLE_LOGIN_API_KEY;
  const dispatch = useDispatch();

  const onSuccess = async (response) => {
    console.log(response);
    const { tokenId } = response;
    dispatch(fetchUserById(tokenId)).then(handleClose);
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.grayBlock}>
        <img src="images/logo/hola_logo_y.png" alt="welcome"></img>
        <div className={styles.exitWrapper} onClick={handleClose}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            tabIndex="1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </div>
      </div>
      <div className={styles.whiteBlock}>
        <h1>Hello World! Code your Dream.</h1>
        <section className={styles.loginWrapper}>
          <GoogleLogin
            clientId={clientId}
            responseType={"id_token"}
            onSuccess={onSuccess}
            onFailure={onFailure}
            render={(renderProps) => (
              <GoogleButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              ></GoogleButton>
            )}
          />
        </section>
      </div>
    </div>
  );
};

export default LoginModal;
