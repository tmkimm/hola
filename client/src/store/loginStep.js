import { createSlice } from "@reduxjs/toolkit";

/* 

loginStep

login을 위한 modal visibility와 
loginStep(social login, signUp)을 관리하는 redux 입니다.

*/

const initialState = {
  modalVisible: false,
  currentStep: 1,
  nickName: undefined,
  id: undefined,
  imageUrl: undefined,
  likeLanguages: [],
};

const loginstepSlice = createSlice({
  name: "loginStep",
  initialState,
  reducers: {
    nextStep: (state, action) => ({
      ...state,
      currentStep: state.currentStep + 1,
    }),
    previousStep: (state, action) => ({
      ...state,
      currentStep: state.currentStep - 1,
    }),
    clearStep: () => initialState,
    setSignUpUser: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    setModalVisible: (state, action) => ({
      ...state,
      modalVisible: action.payload,
    }),
  },
});

export const {
  nextStep,
  previousStep,
  clearStep,
  setSignUpUser,
  setModalVisible,
} = loginstepSlice.actions;
export default loginstepSlice.reducer;
