import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth_service";
import httpClient from "../service/http_client";

const fetchUserById = createAsyncThunk(
  "user/fetchByIdStatus",
  async (userId, thunkAPI) => {
    const response = await authService.googleLogin(userId);
    console.log("response received from auth API : ", response);
    const accessToken = response.data.accessToken;

    // header에 access token 설정
    httpClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return response.data;
  }
);

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
      state.id = payload.nickName;
    },

    [fetchUserByRefreshToken.fulfilled]: (state, { payload }) => {
      state.nickName = payload.nickName;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export { fetchUserById, fetchUserByRefreshToken };
export default userSlice.reducer;
