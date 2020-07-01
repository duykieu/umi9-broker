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
  fetchStatesAction,
} from "../actions/GeoAction";

function NullGeoComonent({ dispatch, GeoReducer }) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    dispatch(fetchStatesAction());
  }, []);

  React.useEffect(() => {
    dispatch(clearCityListAction());
    dispatch(fetchCitiesAction(GeoReducer.selectedState._id));
  }, [GeoReducer.selectedState]);

  React.useEffect(() => {
    console.log({ GeoReducer: GeoReducer.selectedCity });
    if (Object.keys(GeoReducer.selectedCity).length) {
      dispatch(cleartStreetListAction());
      dispatch(clearWardListAction());
      dispatch(
        fetchStreetsAction({
          stateId: GeoReducer.selectedCity.state,
          cityId: GeoReducer.selectedCity._id,
        })
      );
      dispatch(
        fetchWardsAction({
          stateId: GeoReducer.selectedCity.state,
          cityId: GeoReducer.selectedCity._id,
        })
      );
    }
  }, [GeoReducer.selectedCity]);

  return null;
}

const mapStateToProps = ({ GeoReducer }) => ({
  GeoReducer,
});

export default connect(mapStateToProps)(NullGeoComonent);
