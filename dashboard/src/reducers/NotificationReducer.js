import { SET_NOTIFICATION } from "../actions/NotificationAction";

const initState = {
  type: null,
  message: null,
  title: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return { ...action.payload };
    default:
      //including clear
      return {
        ...state,
        ...initState,
      };
  }
};
