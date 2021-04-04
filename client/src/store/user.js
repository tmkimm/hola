import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth_service";
import httpClient from "../service/http_client";

/* 

user 관련 store를 다루는 redux code입니다.
createSlice를 통해 전역 user state를 생성하고,
createAsyncThunk를 통해 user 상태를 update 합니다.

*/

// Userid로 Social Login 후, access token을 설정합니다.
const fetchUserById = createAsyncThunk(
  "user/fetchByIdStatus",
  async (userData, thunkAPI) => {
    let response;
    if (userData.social === "google")
      response = await authService.googleLogin(userData.code);
    else if (userData.social === "kakao")
      response = await authService.kakaoLogin(userData.code);
    else response = await authService.githubLogin(userData.code);

    console.log("response from auth/login", response);
    const accessToken = response.data.accessToken;

    // header에 access token 설정
    httpClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return response.data;
  }
);

/* page refresh시 cookie에 남아있는 http-only의 refresh token을 이용해
   유저 정보를 얻어 옵니다. */
const fetchUserByRefreshToken = createAsyncThunk(
  "user/fetchUserByRefreshToken",
  async (thunkAPI) => {
    const response = await authService.getUserInfo();
    const accessToken = response.data.accessToken;
    const userInfo = {
      nickName: response.data.nickName,
      id: response.data._id,
    };

    // header에 access token 설정
    httpClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return userInfo;
  }
);

// 최초 회원 가입 시 userNickname을 선정합니다.
const addUserNickName = createAsyncThunk(
  "user/addUserNickname",
  async (userInfo, thunkAPI) => {
    const response = await authService.signUp(userInfo);
    console.log("response from addUserNickName! : , ", response);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    nickName: undefined,
    id: undefined,
  },
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    clearUser: (state) => {
      state.nickName = undefined;
      state.id = undefined;
    },
  },
  extraReducers: {
    [fetchUserById.fulfilled]: (state, { payload }) => {
      state.nickName = payload.nickName;
      state.id = payload._id;
    },

    [fetchUserByRefreshToken.fulfilled]: (state, { payload }) => {
      state.nickName = payload.nickName;
      state.id = payload.id;
    },

    [addUserNickName.fulfilled]: (state, { payload }) => {
      state.nickName = payload.nickName;
      state.id = payload._id;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export { fetchUserById, fetchUserByRefreshToken, addUserNickName };
export default userSlice.reducer;
