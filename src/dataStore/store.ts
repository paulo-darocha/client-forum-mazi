import { combineReducers, createStore } from "redux"
import { rootReducer } from "./AppState";

const configureStore = () => {
  return createStore(rootReducer, {});
};

export default configureStore;

// export const store = createStore(combineReducers({}))