import { combineReducers } from "@reduxjs/toolkit";

import booking from "./slices/features/booking/slice";
import usersReducer from "./slices/features/users/slice";

const rootReducers = combineReducers({
  users: usersReducer,
  booking,
});

export default rootReducers;
