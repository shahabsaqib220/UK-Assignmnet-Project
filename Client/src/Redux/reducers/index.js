import { combineReducers } from "redux";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  order: orderReducer,
  // other reducers...
});

export default rootReducer;
