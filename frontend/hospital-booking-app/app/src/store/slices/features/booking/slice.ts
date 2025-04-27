import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { BOOKING } from "./constants";
import { type IBookingType } from "./types";
const repairEndTableCheckState: IBookingType = {
  errors: "",
  booking: [],
};

export const bookingSlice = createSlice({
  name: BOOKING,
  initialState: repairEndTableCheckState,
  reducers: {
    successfullyTransactionsAction: (
      state: IBookingType,
      payload: PayloadAction<IBookingType>
    ) => {
      state.errors = payload.payload.errors;
      state.booking = payload.payload.booking;
    },
  },
});

export const { successfullyTransactionsAction } = bookingSlice.actions;

export default bookingSlice.reducer;
