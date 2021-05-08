import { createSlice } from "@reduxjs/toolkit";

/* 

loginStep

login을 위한 modal visibility와 
loginStep(social login, signUp)을 관리하는 redux 입니다.

*/

const initialState = {
  modalVisible: false,
  currentStep: "LOGIN",
};

const loginstepSlice = createSlice({
  name: "loginStep",
  initialState,
  reducers: {
    nextStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
  },
});

export const { nextStep, setModalVisible } = loginstepSlice.actions;
export default loginstepSlice.reducer;
