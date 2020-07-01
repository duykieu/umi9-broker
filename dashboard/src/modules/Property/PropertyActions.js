import factory from "../actionFactory";
import PropertyService from "./PropertyService";

export const PROPERTY_REPLACE_NODE = "PROPERTY_REPLACE_NODE";
export const PROPERTY_ADD_NODE = "PROPERTY_ADD_NODE";
export const PROPERTY_REMOVE_NODE = "PROPERTY_REMOVE_NODE";
export const PROPERTY_SET_DATA = "PROPERTY_SET_DATA";
export const PROPERTY_CLEAR_DATA = "PROPERTY_CLEAR_DATA";

export const getPropertyAction = factory({
  runService: PropertyService.get,
  returnDataKey: "properties",
  actionType: PROPERTY_SET_DATA,
  noSuccessNotification: true,
});

export const storePropertyAction = factory({
  runService: PropertyService.store,
  returnDataKey: "property",
  actionType: PROPERTY_ADD_NODE,
});

export const updatePropertyAction = factory({
  runService: PropertyService.update,
  returnDataKey: "property",
  actionType: PROPERTY_REPLACE_NODE,
});

export const destroyPropertyAction = factory({
  runService: PropertyService.destroy,
  returnDataKey: "property",
  actionType: PROPERTY_REMOVE_NODE,
});

export function clear() {
  return { type: PROPERTY_CLEAR_DATA };
}
