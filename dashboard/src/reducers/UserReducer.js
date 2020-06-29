import {
  USER_SET_DATA,
  USER_CLEAR_DATA,
  USER_REPLACE_NODE,
  USER_ADD_NODE,
  USER_REMOVE_NODE,
} from "../actions/UserAction";

const defaultState = {
  data: [],
};

const UserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case USER_SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case USER_REPLACE_NODE:
      const data = [...state.data];
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === action.payload._id) {
          data[i] = action.payload;
        }
      }
      return {
        ...state,
        data,
      };
    case USER_ADD_NODE:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case USER_REMOVE_NODE:
      return {
        ...state,
        data: state.data.filter((el) => el._id !== action.payload._id),
      };
    case USER_CLEAR_DATA:
      return {};
    default:
      return state;
  }
};

export default UserReducer;
