import { combineReducers } from "@reduxjs/toolkit";

import repairEndTableCheck from "./slices/features/repairedEndTableCheck/slice";

import setting from "./slices/features/setting/slice";
import usersReducer from "./slices/features/users/slice";

const rootReducers = combineReducers({
  users: usersReducer,

  setting,

  repairEndTableCheck,
});

export default rootReducers;
