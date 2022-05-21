import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./app";
import axios from "axios";

import mainStore from "./stores/mainStore";
import { fetchToken } from "./utils/auth";

const userStore = mainStore.userStore;

axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.headers.common["Authorization"] = "BEARER " + fetchToken();
// axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
