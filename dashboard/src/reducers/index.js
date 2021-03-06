import { combineReducers } from "redux";

import NotificationReducer from "./NotificationReducer";
import GeoReducer from "./GeoReducer";
import CategoryReducer from "./CategoryReducer";
import PriceModelReducer from "./PriceModelReducer";
import UserReducer from "./UserReducer";
import AuthReducer from "./AuthReducer";
import PropertyReducer from "../modules/Property/PropertyReducer";

export default combineReducers({
  NotificationReducer,
  GeoReducer,
  CategoryReducer,
  PriceModelReducer,
  UserReducer,
  AuthReducer,
  PropertyReducer,
});
