import {
  setErrorNotification,
  setSuccessNotification,
  showServerError,
} from "./NotificationAction";

export default ({
  returnDataKey,
  actionType,
  runService,
  noSuccessNotification,
}) => (sendData) => (dispatch) => {
  return runService(sendData)
    .then(({ data: { success, message, entries } }) => {
      if (success) {
        !noSuccessNotification &&
          dispatch(setSuccessNotification(message || "Cập nhật thành công"));
        if (entries && actionType && entries[returnDataKey])
          dispatch({ type: actionType, payload: entries[returnDataKey] });
      } else {
        dispatch(setErrorNotification(message || "Some thing went wrong!"));
      }
      return { success, message, entries };
    })
    .catch((error) =>
      dispatch(showServerError(error || "Something went wrong with server"))
    );
};
