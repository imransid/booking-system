import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import { type OrderEntity } from '@/models/orderEnticesTypes';
import { type IQualityType } from '@/models/qualityTypes';
import { type QCLunchItem } from '@/store/sagas/offline.qcLunchData';

import { SETTING_TYPE } from './constants';
import {
  type inputDelayPayload,
  type LunchTimePayLoad,
  type Payload,
  type TreeNode,
  type UsersStateType
} from './types';

const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

const usersInitialState: UsersStateType = {
  selectedLine: '',
  inputDelay: '5',
  selectedLineID: '',
  selectedRootPath: '',
  offlineQualityTypeDataQuery: [],
  offlineLoggedUserORGtree: [],
  offlineOrderEnticesQuery: [],
  loader: false,
  error: '',
  parentOrgName: '',
  lineStartTime: '',
  lunchStartTime: '',
  lunchEndTime: '',
  currentLunchTimeDate: '',
  offlineQCLunchData: [],
  globalAppSyncLoader: false,
  lastPulledTime: currentDateTime,
  isColorSizeRequired: false,
  logicPlanRequired: false,
  colorStatus: false,
  sizeStatus: false,
  tempToken: '',
  message: ''
};

export const usersSlice = createSlice({
  name: SETTING_TYPE,
  initialState: usersInitialState,
  reducers: {
    updateSetting: (state: UsersStateType, payload: PayloadAction<Payload>) => {
      state.inputDelay = payload.payload.inputDelay;
      state.selectedLine = payload.payload.selectedLine;
      state.selectedLineID = payload.payload.selectedLineID;
      state.selectedRootPath = payload.payload.selectedRootPath;
    },
    updateInputDelaySetting: (state: UsersStateType, payload: PayloadAction<inputDelayPayload>) => {
      state.inputDelay = payload.payload.inputDelay;
    },
    getOrderEnticesQuery: (state: UsersStateType) => {
      state.loader = true;
    },
    setOrderEnticesQuery: (state: UsersStateType, payload: PayloadAction<OrderEntity[]>) => {
      state.loader = false;
      state.offlineOrderEnticesQuery = payload.payload;
    },
    syncNow: (state: UsersStateType, payload: PayloadAction<string>) => {
      state.loader = true;
    },
    updateSyncData: (state: UsersStateType, payload: PayloadAction<TreeNode[]>) => {
      state.loader = false;
      state.offlineLoggedUserORGtree = payload.payload;
      state.error = '';
    },
    updateSyncFailed: (state: UsersStateType) => {
      state.loader = false;
      state.error = 'soothing went wrong';
    },
    stopSettingLoader: (state: UsersStateType) => {
      state.loader = false;
    },
    getLunchTime: (state: UsersStateType) => {
      state.loader = false;
    },
    setLunchTime: (state: UsersStateType, payload: PayloadAction<LunchTimePayLoad>) => {
      state.loader = false;
      state.currentLunchTimeDate = payload.payload.currentLunchTimeDate;
      state.parentOrgName = payload.payload.parentOrgName;
      state.lineStartTime = payload.payload.lineStartTime;
      state.lunchStartTime = payload.payload.lunchStartTime;
      state.lunchEndTime = payload.payload.lunchEndTime;
    },
    updateOfflineQualityTypeDataQuery: (
      state: UsersStateType,
      payload: PayloadAction<IQualityType[]>
    ) => {
      state.offlineQualityTypeDataQuery = payload.payload;
    },

    // set qc data array
    setQCLunchData: (state: UsersStateType, payload: PayloadAction<QCLunchItem[]>) => {
      state.offlineQCLunchData = payload.payload;
    },
    updateGlobalLoader: (state: UsersStateType, payload: PayloadAction<boolean>) => {
      state.globalAppSyncLoader = payload.payload;
    },
    setLastPullTime: (state: UsersStateType, payload: PayloadAction<any>) => {
      state.lastPulledTime = payload.payload;
    },
    getVarianceSetting: (state: UsersStateType) => {
      state.isColorSizeRequired = false;
    },
    setVarianceSetting: (state: UsersStateType, payload: PayloadAction<any>) => {
      state.isColorSizeRequired = payload.payload[0];
      state.logicPlanRequired = payload.payload[1];
    },
    updateColorStatus: (state: UsersStateType, payload: PayloadAction<any, any>) => {
      state.colorStatus = payload.payload;
    },
    updateSizeStatus: (state: UsersStateType, payload: PayloadAction<any>) => {
      state.sizeStatus = payload.payload;
    },
    updateMessage: (state: UsersStateType, payload: PayloadAction<string>) => {
      state.message = payload.payload;
    }
  }
});

export const {
  updateMessage,
  updateSetting,
  updateInputDelaySetting,
  getOrderEnticesQuery,
  setOrderEnticesQuery,
  syncNow,
  updateSyncData,
  updateSyncFailed,
  stopSettingLoader,
  setLunchTime,
  getLunchTime,
  updateOfflineQualityTypeDataQuery,
  setQCLunchData,
  updateGlobalLoader,
  setLastPullTime,
  getVarianceSetting,
  setVarianceSetting,
  updateColorStatus,
  updateSizeStatus
} = usersSlice.actions;

export default usersSlice.reducer;
