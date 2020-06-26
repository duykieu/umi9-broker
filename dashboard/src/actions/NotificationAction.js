export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";

export const setErrorNotification = (message) => ({
  type: SET_NOTIFICATION,
  payload: {
    type: "error",
    title: "Error",
    message,
  },
});

export const setInfoNotification = (message) => ({
  type: SET_NOTIFICATION,
  payload: {
    type: "info",
    title: "Info",
    message,
  },
});

export const setSuccessNotification = (message) => {
  return {
    type: SET_NOTIFICATION,
    payload: {
      type: "success",
      title: "Success",
      message,
    },
  };
};

export const clearNotificationAction = () => {
  return {
    type: CLEAR_NOTIFICATION,
  };
};

export const showServerError = (error) => {
  //   devLog(error);TODO: logging
  return setErrorNotification(
    error.message ||
      "Something went wrong with server connection, please contact administrator"
  );
};
