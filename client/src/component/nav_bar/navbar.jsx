import React, { useEffect } from "react";
import LoginModal from "../modal/login_modal/loginModal";
import Modal from "../modal/modal_component/modal";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoginUser from "../login_user/loginUser";
import { setModalVisible } from "../../store/loginStep";
import { clearUser, fetchUserByRefreshToken } from "../../store/user";
import { toast } from "react-toastify";

/* 
To-do

생각해 봐야할 부분
react modal을 modalVisible을 통해 rendering 여부를 결정해 주는게 의미가 있는가?

*/
const Navbar = React.memo(({ showRegisterButton }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const modalVisible = useSelector((state) => state.loginStep.modalVisible);
  const openModal = () => {
    document.body.style.overflow = "hidden";
    dispatch(setModalVisible(true));
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    dispatch(setModalVisible(false));
  };

  useEffect(() => {
    if (user.nickName) {
      // 이거 언제하는 작업이지..?
      // page refresh후 갱신
      // 지금은 로그인 직후에도 일어남.. 상관은 없긴한데.. 없앨 수 있나? 차라리 banner나 여기로 가는게?
      dispatch(fetchUserByRefreshToken()).then((response) => {
        // 유저 nickname 존재시 refresh token을 이용해서 유저정보 얻어옴
        if (response.meta.requestStatus !== "fulfilled") {
          history.push("/");
          dispatch(clearUser()); // 유저 초기화
          toast.error("로그인이 만료 되었어요!", {
            position: "top-right",
            autoClose: 3000,
          });
        }
        console.log("fetchByuserRefreshToken response :", response);
        // 실패했을때 에러처리 필요할 듯
      });
    }
  }, [dispatch, history, user.nickName]);

  return (
    <nav className={styles.navbar}>
      <a href="/">
        <img
          className={styles.logo}
          src="/images/logo/hola_logo_w.png"
          alt="logo"
        />
      </a>
      <div className={styles.loginElementWrapper}>
        {!user.nickName ? (
          <button className={styles.login} onClick={openModal}>
            로그인
          </button>
        ) : (
          <>
            {showRegisterButton && (
              <button className={styles.postRegister}>
                <Link to="/register">새 글 쓰기</Link>
              </button>
            )}
            <LoginUser />
          </>
        )}
      </div>
      <Modal visible={modalVisible} name="login" onClose={closeModal}>
        <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
      </Modal>
    </nav>
  );
});

export default Navbar;
