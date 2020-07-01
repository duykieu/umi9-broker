import {
  PROPERTY_SET_DATA,
  PROPERTY_CLEAR_DATA,
  PROPERTY_REPLACE_NODE,
  PROPERTY_ADD_NODE,
  PROPERTY_REMOVE_NODE,
} from "./PropertyActions";

const defaultState = {
  data: [],
};

const PropertyReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PROPERTY_SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case PROPERTY_REPLACE_NODE:
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
    case PROPERTY_ADD_NODE:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case PROPERTY_REMOVE_NODE:
      return {
        ...state,
        data: state.data.filter((el) => el._id !== action.payload._id),
      };
    case PROPERTY_CLEAR_DATA:
      return {};
    default:
      return state;
  }
};

export default PropertyReducer;
