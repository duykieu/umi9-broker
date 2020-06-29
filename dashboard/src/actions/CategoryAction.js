import factory from "./factory";
import CategoryService from "../services/CategoryService";

export const CATEGORY_REPLACE_NODE = "CATEGORY_REPLACE_NODE";
export const CATEGORY_ADD_NODE = "CATEGORY_ADD_NODE";
export const CATEGORY_REMOVE_NODE = "CATEGORY_REMOVE_NODE";
export const CATEGORY_SET_DATA = "CATEGORY_SET_DATA";
export const CATEGORY_CLEAR_DATA = "CATEGORY_CLEAR_DATA";

export const getCategoryAction = factory({
  runService: CategoryService.get,
  returnDataKey: "categories",
  actionType: CATEGORY_SET_DATA,
  noSuccessNotification: true,
});

export const storeCategoryAction = factory({
  runService: CategoryService.store,
  returnDataKey: "category",
  actionType: CATEGORY_ADD_NODE,
});

export const updateCategoryAction = factory({
  runService: CategoryService.update,
  returnDataKey: "category",
  actionType: CATEGORY_REPLACE_NODE,
});

export const destroyCategoryAction = factory({
  runService: CategoryService.destroy,
  returnDataKey: "category",
  actionType: CATEGORY_REMOVE_NODE,
});

export function clear() {
  return { type: CATEGORY_CLEAR_DATA };
}
