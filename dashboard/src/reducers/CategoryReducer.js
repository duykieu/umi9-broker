import {
  CATEGORY_SET_DATA,
  CATEGORY_CLEAR_DATA,
  CATEGORY_REPLACE_NODE,
  CATEGORY_ADD_NODE,
  CATEGORY_REMOVE_NODE,
} from "../actions/CategoryAction";

const defaultState = {
  data: [],
};

const CategoryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CATEGORY_SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case CATEGORY_REPLACE_NODE:
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
    case CATEGORY_ADD_NODE:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case CATEGORY_REMOVE_NODE:
      return {
        ...state,
        data: state.data.filter((el) => el._id !== action.payload._id),
      };
    case CATEGORY_CLEAR_DATA:
      return {};
    default:
      return state;
  }
};

export default CategoryReducer;
