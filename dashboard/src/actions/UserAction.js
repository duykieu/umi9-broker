import factory from "./factory";
import UserService from "../services/UserService";

export const USER_REPLACE_NODE = "USER_REPLACE_NODE";
export const USER_ADD_NODE = "USER_ADD_NODE";
export const USER_REMOVE_NODE = "USER_REMOVE_NODE";
export const USER_SET_DATA = "USER_SET_DATA";
export const USER_CLEAR_DATA = "USER_CLEAR_DATA";

export const getUserAction = factory({
  runService: UserService.get,
  returnDataKey: "users",
  actionType: USER_SET_DATA,
  noSuccessNotification: true,
});

export const storeUserAction = factory({
  runService: UserService.store,
  returnDataKey: "user",
  actionType: USER_ADD_NODE,
});

export const updateUserAction = factory({
  runService: UserService.update,
  returnDataKey: "user",
  actionType: USER_REPLACE_NODE,
});

export const destroyUserAction = factory({
  runService: UserService.destroy,
  returnDataKey: "user",
  actionType: USER_REMOVE_NODE,
});

export function clear() {
  return { type: USER_CLEAR_DATA };
}
