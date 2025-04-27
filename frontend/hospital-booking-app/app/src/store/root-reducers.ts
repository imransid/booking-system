import { combineReducers } from "@reduxjs/toolkit";

import booking from "./slices/features/booking/slice";
import hospital from "./slices/features/hospital/slice";
import usersReducer from "./slices/features/users/slice";

const rootReducers = combineReducers({
  users: usersReducer,
  hospital,
  booking,
});

export default rootReducers;
