import { combineReducers } from "redux";

import authReducer from "./auth";
import ideaReducer from "./idea";
import investmentReducer from "./investment";

export default combineReducers({
  authReducer, ideaReducer, investmentReducer,
});
