import user from "../store/user";
import httpClient from "./http_client";

/* 
auth 관련 API를 정의한 class입니다.

*/
class Auth {
  constructor(httpClient) {
    this.auth = httpClient;
  }

  googleLogin = async (code) => {
    console.log("code: ", code);
    try {
      const user = await this.auth.post("login/google", {
        code,
      });
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  githubLogin = async (code) => {
    try {
      const user = await this.auth.post("login/github", {
        code,
      });
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  kakaoLogin = async (accessToken) => {
    try {
      const user = await this.auth.post("login/kakao", {
        accessToken,
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

  getUserInfo = async () => {
    try {
      const userInfo = await this.auth.get("auth");
      return userInfo;
    } catch (error) {
      console.error(error);
    }
  };

  signUp = async (userInfo) => {
    const signUpResponse = await this.auth.post("login/signup", userInfo);
    console.log("signUpresponse : ", signUpResponse);
  };
}

const authService = new Auth(httpClient);
export default authService;
