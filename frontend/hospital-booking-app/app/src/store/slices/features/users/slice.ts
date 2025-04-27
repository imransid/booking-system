import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { USERS } from "./constants";
import { IUser, type ILogInPayload, type UsersStateType } from "./types";
const usersInitialState: UsersStateType = {
  user: {
    data: null,
  },
  loader: false,
};

export const usersSlice = createSlice({
  name: USERS,
  initialState: usersInitialState,
  reducers: {
    setUser: (state: UsersStateType, payload: PayloadAction<IUser>) => {
      state.user.data = payload.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
