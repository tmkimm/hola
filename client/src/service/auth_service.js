import httpClient from "./http_client";

/* 
auth 관련 API를 정의한 class입니다.
*/

class Auth {
  constructor(httpClient) {
    this.auth = httpClient;
  }

  login = async (method, code) => {
    try {
      const user = await this.auth.post(`login`, {
        loginType: method,
        code,
      });
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  logout = async () => {
    try {
      const res = await this.auth.post("logout");
      console.log("returned value from logout API : ", res);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  /* page refresh시 cookie에 남아있는 http-only refresh token을 이용해
   유저 정보를 얻어 옵니다. */
  getUserInfo = async () => {
    try {
      const userInfo = await this.auth.get("auth");
      return userInfo;
    } catch (error) {
      console.error(error);
    }
  };

  /* userInfo를 전달하여 회원가입을 진행합니다. */
  signUp = async (userInfo) => {
    console.log("here for signup!");
    return await this.auth.post("login/signup", userInfo);
  };
}

const authService = new Auth(httpClient);
export default authService;
