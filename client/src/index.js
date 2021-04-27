import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./store/language";
import userReducer from "./store/user";
import writeReducer from "./store/write";
import loginStepReducer from "./store/loginStep";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    language: languageReducer,
    user: userReducer,
    write: writeReducer,
    loginStep: loginStepReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
