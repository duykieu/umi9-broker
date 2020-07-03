import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "umi9-broker232238",
  storage,
};

const middleWare = [];

middleWare.push(thunk);

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === "development",
});
middleWare.push(loggerMiddleware);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, loggerMiddleware)
);
export const persistor = persistStore(store);
