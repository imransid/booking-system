import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { HOSPITAL } from "./constants";
import { IHospitalStateType } from "./types";

const hospitalInitialState: IHospitalStateType = {
  hospitalData: [],
};

export const usersSlice = createSlice({
  name: HOSPITAL,
  initialState: hospitalInitialState,
  reducers: {
    loadHospitalData: (
      state: IHospitalStateType,
      payload: PayloadAction<IHospitalStateType[]>
    ) => {
      state.hospitalData = payload.payload;
    },
  },
});

export const { loadHospitalData } = usersSlice.actions;

export default usersSlice.reducer;
