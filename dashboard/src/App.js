import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./App.scss";
import MainRouter from "./MainRouter";
import NullGeoComponent from "./components/NullGeoComponent";
import NullNotificationComponent from "./components/NullNotification";

function App({ notification, dispatch }) {
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.baseURL = process.env.REACT_APP_MAIN_API;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return (
    <React.Fragment>
      <MainRouter />
      <NullGeoComponent />
      <NullNotificationComponent />
      App
    </React.Fragment>
  );
}

const mapStateToProps = ({ NotificationReducer }) => ({
  notification: NotificationReducer,
});

export default connect(mapStateToProps)(App);
