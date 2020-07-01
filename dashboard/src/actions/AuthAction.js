import AuthService from "../services/AuthService";
import {
  setErrorNotification,
  setSuccessNotification,
} from "./NotificationAction";

export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const authLoginAction = (userData) => (dispatch) => {
  return AuthService.login(userData)
    .then(({ data: { data, success, message } }) => {
      console.log({ successInAction: success });
      if (!success) {
        dispatch(setErrorNotification(message));
      } else {
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
      }

      return success;
    })
    .catch((error) => {
      dispatch(setErrorNotification("Kết nối với máy chủ thất bại!"));
      return false;
    });
};

export const authLogoutAction = () => (dispatch) => {
  dispatch(setSuccessNotification("Thoát khỏi hệ thống thành công!"));
  return dispatch({ type: AUTH_LOGOUT });
};
