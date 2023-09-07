import { createStore, combineReducers } from "redux";
import navbarReducer from "./Reducers/navbarReducer";

const rootReducer = combineReducers({
  navbar: navbarReducer,
});

const store = createStore(rootReducer);

export default store;
