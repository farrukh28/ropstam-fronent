import { combineReducers } from "@reduxjs/toolkit";

// reducers
import authUserReducer from "./authUser";

const rootReducer = combineReducers({
  authUser: authUserReducer,
});

export default rootReducer;
