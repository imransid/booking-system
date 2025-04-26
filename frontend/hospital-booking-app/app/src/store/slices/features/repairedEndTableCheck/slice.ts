import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { REPAIRED_END_TABLE_CHECK_TYPE } from './constants';
import { type RepairEndTableCheckType } from './types';
const repairEndTableCheckState: RepairEndTableCheckType = {
  errors: '',
  repairPassValue: 0,
  repairAlterValue: 0,
  repairRejectValue: 0
};

export const repairEndTableCheckSlice = createSlice({
  name: REPAIRED_END_TABLE_CHECK_TYPE,
  initialState: repairEndTableCheckState,
  reducers: {
    successfullyRepairQueryTransactionsAction: (
      state: RepairEndTableCheckType,
      payload: PayloadAction<RepairEndTableCheckType>
    ) => {
      state.errors = payload.payload.errors;
      state.repairPassValue = payload.payload.repairPassValue;
      state.repairAlterValue = payload.payload.repairAlterValue;
      state.repairRejectValue = payload.payload.repairRejectValue;
    }
  }
});

export const { successfullyRepairQueryTransactionsAction } = repairEndTableCheckSlice.actions;

export default repairEndTableCheckSlice.reducer;
