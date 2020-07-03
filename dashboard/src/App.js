import React from "react";
import { connect } from "react-redux";
import { HashRouter } from "react-router-dom";
import axios from "axios";
import "./App.scss";
import MainRouter from "./routes/MainRouter";
import NullGeoComponent from "./components/NullGeoComponent";
import NullNotificationComponent from "./components/NullNotification";

function App({ notification, dispatch, AuthReducer }) {
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.baseURL = process.env.REACT_APP_MAIN_API;
      config.headers.Authorization = AuthReducer.token && `Bearer ${AuthReducer.token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return (
    <HashRouter>
      <MainRouter />
      <NullNotificationComponent />
    </HashRouter>
  );
}

const mapStateToProps = ({ NotificationReducer, AuthReducer }) => ({
  notification: NotificationReducer,
  AuthReducer,
});

export default connect(mapStateToProps)(App);
