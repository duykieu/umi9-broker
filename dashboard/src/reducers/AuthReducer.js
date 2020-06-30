import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from "../actions/AuthAction";

const initState = {
  currentUser: null,
  token: null,
  permissions: [],
};

const Auth_Reducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
        permissions: action.payload.permissions,
      };
    case AUTH_LOGOUT:
      return initState;
    default:
      return state;
  }
};

export default Auth_Reducer;
