import { createStore } from "redux"
import { rootReducer } from "./ReduxType";

const configureStore = () => {
  return createStore(rootReducer, {});
};

export default configureStore;

// export const store = createStore(combineReducers({}))