import {
  PRICE_MODEL_SET_DATA,
  PRICE_MODEL_CLEAR_DATA,
  PRICE_MODEL_REPLACE_NODE,
  PRICE_MODEL_ADD_NODE,
  PRICE_MODEL_REMOVE_NODE,
} from "../actions/PriceModelAction";

const defaultState = {
  data: [],
};

const PriceModelReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PRICE_MODEL_SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case PRICE_MODEL_REPLACE_NODE:
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
    case PRICE_MODEL_ADD_NODE:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case PRICE_MODEL_REMOVE_NODE:
      return {
        ...state,
        data: state.data.filter((el) => el._id !== action.payload._id),
      };
    case PRICE_MODEL_CLEAR_DATA:
      return {};
    default:
      return state;
  }
};

export default PriceModelReducer;
