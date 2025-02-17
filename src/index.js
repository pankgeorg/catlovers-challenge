import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { API_BASE_URL } from "./constants";
import { uuid } from "./utils/utils";

// This is bad
// A token here would be worse! #underpressure #leastevil
// Given token is what user gave.
// We'll save it to localStorage.TOKEN when it successfully gets some kittens.
// 2 problems: Cache invalidation, naming things, off by one errors
localStorage.GIVEN_TOKEN =
  // eslint-disable-next-line no-alert
  localStorage.TOKEN || window.prompt("Please give us a token to continue!");

// `/vote` needs authorization (200 if OK, 401 if not)
!localStorage.TOKEN &&
  fetch(`${API_BASE_URL}/votes`, {
    headers: { "X-API-KEY": localStorage.GIVEN_TOKEN }
  }).then(({ status }) => {
    if (status === 200 || status === 204)
      localStorage.TOKEN = localStorage.GIVEN_TOKEN;
  });

//* * Remember each user of this app as an individual */
localStorage.SUB_ID = localStorage.SUB_ID || uuid();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
