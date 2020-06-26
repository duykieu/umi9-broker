import {
  SET_STATE_LIST,
  SET_CITY_LIST,
  SET_STREET_LIST,
  SET_WARD_LIST,
  SET_STATE,
  SET_CITY,
  SET_STREET,
  SET_WARD,
  CLEAR_CITY_LIST,
  CLEAR_STREET_LIST,
  CLEAR_WARD_LIST,
} from "../actions/GeoAction";

const initState = {
  states: [],
  cities: [],
  wards: [],
  streets: [],
  selectedState: {
    id: "1",
    code: "SG",
    name: "Hồ Chí Minh",
  },
  selectedCity: {},
  selectedStreet: {},
  selectedWard: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_STATE_LIST:
      return {
        ...state,
        states: action.payload,
      };
    case SET_CITY_LIST:
      return {
        ...state,
        cities: action.payload,
      };
    case SET_STREET_LIST:
      return {
        ...state,
        streets: action.payload,
      };
    case SET_WARD_LIST:
      return {
        ...state,
        wards: action.payload,
      };
    case SET_STATE:
      return {
        ...state,
        selectedState:
          state.states.find((item) => item.code === action.payload) || {},
      };
    case SET_CITY:
      return {
        ...state,
        selectedCity:
          state.cities.find((item) => item.code === action.payload) || {},
      };
    case SET_WARD:
      return {
        ...state,
        selectedWard:
          state.wards.find((item) => item.code === action.payload) || {},
      };
    case SET_STREET:
      return {
        ...state,
        selectedStreet:
          state.streets.find((item) => item.code === action.payload) || {},
      };
    case CLEAR_CITY_LIST:
      return {
        ...state,
        cities: [],
        selectedCity: {},
      };
    case CLEAR_STREET_LIST:
      return {
        ...state,
        streets: [],
        selectedStreet: {},
      };

    case CLEAR_WARD_LIST:
      return {
        ...state,
        wards: [],
        selectedWard: {},
      };

    default:
      return state;
  }
};
