import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import Study from "./service/study_service";

const httpClient = axios.create({
  baseURL: "http://localhost:3000/api/",
});

const study = new Study(httpClient);

ReactDOM.render(
  <React.StrictMode>
    <App studyService={study} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
