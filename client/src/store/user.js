import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import authService from "../service/auth_service";
import httpClient from "../service/http_client";

/* 

user 관련 store를 다루는 redux code입니다.
createSlice를 통해 전역 user state를 생성하고,
createAsyncThunk를 통해 user 상태를 update 합니다.

to-do
fullfilled외에 rejected도 처리 로직 추가
request abort나 signal에 대해서 찾아보기
loading state 추가하면 좋을듯

받는쪽에서 로그인 함수를 합칠 수 있는지 보자

*/

// action 정의
const fetchUserByIdAction = createAction("user/fetchByIdStatus");
const fetchUserByRefreshTokenAction = createAction(
  "user/fetchUserByRefreshToken"
);
const addUserNickNameAction = createAction("user/addUserNickName");

// Userid로 Social Login 후, access token을 설정합니다.
const fetchUserById = createAsyncThunk(
  fetchUserByIdAction,
  async (userData, thunkAPI) => {
    const response = await authService.login(userData.social, userData.code);
    console.log("response from auth/login", response);
    const accessToken = response.data.accessToken;

    // header에 access token 설정
    httpClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return response.data;
  }
);

/* page refresh시 cookie에 남아있는 http-only refresh token을 이용해
   유저 정보를 얻어 옵니다. */
const fetchUserByRefreshToken = createAsyncThunk(
  fetchUserByRefreshTokenAction,
  async (thunkAPI) => {
    const response = await authService.getUserInfo();
    console.log("res: #################", response);
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

// 최초 회원 가입 시 user nickname을 설정하고 access token을 set합니다.
const addUserNickName = createAsyncThunk(
  addUserNickNameAction,
  async (userInfo, thunkAPI) => {
    const response = await authService.signUp(userInfo);
    const accessToken = response.data.accessToken;
    console.log("response from addUserNickName! : , ", response);

    httpClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return userInfo;
  }
);

// dispatch(action) => reducer => state => re-rendering
// dispatch(action) => thunk => 비동기처리 => reducer => state => re-rendering

const initialState = {
  nickName: undefined,
  id: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    clearUser: (state) => initialState,
  },
  extraReducers: {
    [fetchUserById.fulfilled]: (state, { payload }) => {
      console.log("#########payload!!!", payload);
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
