import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth_service";
import httpClient from "../service/http_client";

const fetchUserById = createAsyncThunk(
  "user/fetchByIdStatus",
  async (userId, thunkAPI) => {
    const response = await authService.googleLogin(userId);
    const accessToken = response.data.accessToken;

    httpClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: undefined,
    id: undefined,
  },
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    clearUser: (state, action) => {
      state = null;
    },
  },
  extraReducers: {
    [fetchUserById.fulfilled]: (state, { payload }) => {
      state.name = payload.userName;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export { fetchUserById };

export default userSlice.reducer;
