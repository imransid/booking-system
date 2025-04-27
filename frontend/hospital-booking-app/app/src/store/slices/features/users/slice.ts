import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { USERS } from "./constants";
import { type ILogInPayload, type UsersStateType } from "./types";
const usersInitialState: UsersStateType = {
  user: {
    data: null,
  },
  loader: false
};

export const usersSlice = createSlice({
  name: USERS,
  initialState: usersInitialState,
  reducers: {
    getUserAction: (
      state: UsersStateType,
      { payload: ILogInPayload }: PayloadAction<ILogInPayload>
    ) => {
      state.user.isLoading = true;
      state.user.errors = "";
      state.user.loginStatus = false;
    },
  },
});

export const { getUserAction } = usersSlice.actions;

export default usersSlice.reducer;
