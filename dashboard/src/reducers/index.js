import { combineReducers } from "redux";

import NotificationReducer from "./NotificationReducer";
import GeoReducer from "./GeoReducer";
import CategoryReducer from "./CategoryReducer";
import PriceModelReducer from "./PriceModelReducer";

export default combineReducers({
  NotificationReducer,
  GeoReducer,
  CategoryReducer,
  PriceModelReducer,
});
