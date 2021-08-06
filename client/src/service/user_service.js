import httpClient from "./http_client";

/* 
user 관련 API를 정의한 class입니다.
*/

class User {
  constructor(httpClient) {
    this.user = httpClient;
  }

  // id를 이용해 사용자 정보를 조회합니다.
  getUserInfo = async (id) => {
    try {
      const user = await this.user.get(`users/${id}`);
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  // user nickname 중복 검사를 실행합니다.
  checkNickname = async (id, nickName) => {
    try {
      const response = await this.user.get(
        `users/${id}/exists?nickName=${nickName}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // 닉네임을 이용해 사용자 정보를 조회합니다.
  getUserInfoByNickName = async (nickName) => {
    try {
      const params = {
        nickName: nickName,
      };

      const user = await this.user.get(`users`, {
        params,
      });
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  // 사용자 정보를 수정합니다.
  // 닉네임이 변경될 경우 AccessToken을 다시 설정해야 합니다.
  modifyUserInfo = async (id, userData) => {
    try {
      const user = await this.user.patch(`users/${id}`, userData);
      return {
        user,
        modifySuccess: true,
      };
    } catch (error) {
      return {
        user: null,
        modifySuccess: false,
      };
    }
  };

  // 회원 탈퇴
  deleteUser = async (id) => {
    try {
      await this.user.delete(`users/${id}`);
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  getUserReadList = async (id) => {
    try {
      const response = await this.user.get(`users/read-list/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  getUserLikeList = async (id) => {
    try {
      const response = await this.user.get(`users/likes/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  getUserPostList = async (id) => {
    try {
      const response = await this.user.get(`users/myStudies/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  submitFeedback = async ({ rating, content }) => {
    try {
      const response = await this.user.post(`feedback`, {
        rating,
        content,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}

const userService = new User(httpClient);
export default userService;
