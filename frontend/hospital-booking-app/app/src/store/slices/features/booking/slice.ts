import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { BOOKING } from "./constants";
import { type IBookingType } from "./types";
import { BookingInput } from "@/app/src/hooks/useBooking";
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
      payload: PayloadAction<BookingInput>
    ) => {
      if (state.booking) {
        state.booking.push(payload.payload);
      }
    },
  },
});

export const { successfullyTransactionsAction } = bookingSlice.actions;

export default bookingSlice.reducer;
