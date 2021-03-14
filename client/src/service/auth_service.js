import httpClient from "./http_client";

class Auth {
  constructor(httpClient) {
    this.auth = httpClient;
  }

  googleLogin = async (tokenId) => {
    try {
      const user = await this.auth.post("login/google", {
        tokenId,
      });
      return user;
    } catch (error) {
      console.error(error);
    }
  };
}

const authService = new Auth(httpClient);
export default authService;
