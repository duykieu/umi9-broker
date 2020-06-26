import React from "react";
import { connect } from "react-redux";
import {
  fetchCitiesAction,
  fetchStreetsAction,
  fetchWardsAction,
  clearStateListAction,
  clearCityListAction,
  clearWardListAction,
  cleartStreetListAction,
  setWardAction,
  setStreetAction,
  setCityAction,
} from "../actions/GeoAction";

function NullGeoComonent({ dispatch, GeoReducer }) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    dispatch(setCityAction(undefined));
    dispatch(setWardAction(undefined));
    dispatch(setStreetAction(undefined));
    dispatch(fetchCitiesAction(GeoReducer.selectedState.code));
  }, [GeoReducer.selectedState]);

  React.useEffect(() => {
    if (
      GeoReducer.selectedCity &&
      Object.keys(GeoReducer.selectedCity).length
    ) {
      dispatch(setWardAction(undefined));
      dispatch(setStreetAction(undefined));
      dispatch(fetchStreetsAction(GeoReducer.selectedCity.code));
      dispatch(fetchWardsAction(GeoReducer.selectedCity.code));
    }
  }, [GeoReducer.selectedCity]);

  return null;
}

const mapStateToProps = ({ GeoReducer }) => ({
  GeoReducer,
});

export default connect(mapStateToProps)(NullGeoComonent);
