import { type OrderEntity } from '@/models/orderEnticesTypes';
import { type IQualityType } from '@/models/qualityTypes';
import { type QCLunchItem } from '@/store/sagas/offline.qcLunchData';

// The users global state
export interface UsersStateType {
  selectedLine: string;
  inputDelay: string;
  selectedLineID: string;
  selectedRootPath: string;
  offlineQualityTypeDataQuery: IQualityType[];
  offlineLoggedUserORGtree: TreeNode[];
  offlineOrderEnticesQuery: OrderEntity[];
  loader: boolean;
  error: string;
  parentOrgName: string;
  lineStartTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  currentLunchTimeDate: string;
  offlineQCLunchData: QCLunchItem[];
  globalAppSyncLoader: boolean;
  lastPulledTime: string;
  isColorSizeRequired: boolean;
  colorStatus: boolean;
  sizeStatus: boolean;
  logicPlanRequired: boolean;
  tempToken: string;
  message: string;
}

export interface TreeNode {
  id: number;
  name: string;
  rootPath: string;
  parentId?: number;
  parent?: number;
  parentName?: string;
  children: TreeNode[];
}

export interface Payload {
  selectedLine: string;
  inputDelay: string;
  selectedLineID: string;
  selectedRootPath: string;
}

export interface inputDelayPayload {
  inputDelay: string;
}

export interface LunchTimePayLoad {
  parentOrgName: string;
  lineStartTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  currentLunchTimeDate: string;
}
