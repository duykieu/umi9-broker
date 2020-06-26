import factory from "./factory";
import PriceModelService from "../services/PriceModelService";

export const PRICE_MODEL_REPLACE_NODE = "ACCOUNT_REPLACE_NODE";
export const PRICE_MODEL_ADD_NODE = "PRICE_MODEL_ADD_NODE";
export const PRICE_MODEL_REMOVE_NODE = "PRICE_MODEL_REMOVE_NODE";
export const PRICE_MODEL_SET_DATA = "PRICE_MODEL_SET_DATA";
export const PRICE_MODEL_CLEAR_DATA = "PRICE_MODEL_CLEAR_DATA";

export const getPriceModelAction = factory({
  runService: PriceModelService.get,
  returnDataKey: "priceModels",
  actionType: PRICE_MODEL_SET_DATA,
  noSuccessNotification: true,
});

export const storePriceModelAction = factory({
  runService: PriceModelService.store,
  returnDataKey: "priceModel",
  actionType: PRICE_MODEL_ADD_NODE,
});

export const updatePriceModelAction = factory({
  runService: PriceModelService.update,
  returnDataKey: "priceModel",
  actionType: PRICE_MODEL_REPLACE_NODE,
});

export const destroyPriceModelAction = factory({
  runService: PriceModelService.destroy,
  returnDataKey: "priceModel",
  actionType: PRICE_MODEL_REMOVE_NODE,
});

export function clear() {
  return { type: PRICE_MODEL_CLEAR_DATA };
}
