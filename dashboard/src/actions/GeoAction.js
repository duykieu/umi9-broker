import factory from "./factory";
import GeoService from "../services/GeoService";

export const SET_STATE_LIST = "SET_STATE_LIST";
export const SET_CITY_LIST = "SET_CITY_LIST";
export const SET_WARD_LIST = "SET_WARD_LIST";
export const SET_STREET_LIST = "SET_STREET_LIST";

export const CLEAR_STATE_LIST = "CLEAR_STATE_LIST";
export const CLEAR_CITY_LIST = "CLEAR_CITY_LIST";
export const CLEAR_WARD_LIST = "CLEAR_WARD_LIST";
export const CLEAR_STREET_LIST = "CLEAR_STREET_LIST";

export const SET_STATE = "SET_STATE";
export const SET_CITY = "SET_CITY";
export const SET_WARD = "SET_WARD";
export const SET_STREET = "SET_STREET";

export const fetchStatesAction = factory({
  runService: GeoService.fetchStates,
  returnDataKey: "states",
  actionType: SET_STATE_LIST,
  noSuccessNotification: true,
});

export const fetchCitiesAction = factory({
  runService: GeoService.fetchCities,
  returnDataKey: "cities",
  actionType: SET_CITY_LIST,
  noSuccessNotification: true,
});

export const fetchWardsAction = factory({
  runService: GeoService.fetchWards,
  returnDataKey: "wards",
  actionType: SET_WARD_LIST,
  noSuccessNotification: true,
});

export const fetchStreetsAction = factory({
  runService: GeoService.fetchStreets,
  returnDataKey: "streets",
  actionType: SET_STREET_LIST,
  noSuccessNotification: true,
});

export const setStateAction = (code) => (dispatch) => {
  return new Promise(() => {
    return dispatch({
      type: SET_STATE,
      payload: code,
    });
  });
};
export const setCityAction = (code) => (dispatch) => {
  return new Promise(() => {
    dispatch({
      type: SET_CITY,
      payload: code,
    });
  });
};

export const setWardAction = (code) => ({
  type: SET_WARD,
  payload: code,
});
export const setStreetAction = (code) => ({
  type: SET_STREET,
  payload: code,
});

export const clearCityListAction = () => ({
  type: CLEAR_CITY_LIST,
});
export const clearWardListAction = () => ({
  type: CLEAR_WARD_LIST,
});
export const cleartStreetListAction = () => ({
  type: CLEAR_STREET_LIST,
});
