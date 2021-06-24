import { createSlice } from "@reduxjs/toolkit";

/* 

loginStep

login을 위한 modal visibility와 
loginStep(social login, signUp)을 관리하는 redux 입니다.

*/

const initialState = {
  modalVisible: false,
  currentStep: 1,
};

const loginstepSlice = createSlice({
  name: "loginStep",
  initialState,
  reducers: {
    nextStep: (state, action) => ({
      ...state,
      currentStep: state.currentStep + 1,
    }),
    setModalVisible: (state, action) => ({
      ...state,
      modalVisible: action.payload,
    }),
    previousStep: (state, action) => ({
      ...state,
      currentStep: state.currentStep - 1,
    }),
    clearStep: () => initialState,
  },
});

export const { nextStep, previousStep, clearStep, setModalVisible } =
  loginstepSlice.actions;
export default loginstepSlice.reducer;
