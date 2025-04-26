interface IQualityDefect {
  defect: {
    id: number;
  };
  organization: {
    id: number;
  };
  imageId: number;
  partId: string;
  positionX: number;
  positionY: number;
  operation: {
    id: number;
  };
}

export interface IQualityEntry {
  orderEntity: {
    id: number;
  };
  workProcess: {
    id: number;
  };
  organization: {
    id: number;
  };
  style: {
    id: string;
  };
  qualityType: {
    id: number;
  };
  newQualityDefect: IQualityDefect[];
  sampleSize: number;
  checkOutput: string;
  productionTime: string;
  transactionId: string;
  deviceId: string;
  repaired: boolean;
}

// Main interface representing the JSON structure
export interface IQualityData {
  orderEntity: {
    id: number;
  };
  workProcess: {
    id: number;
  };
  organization: {
    id: number;
  };
  style: {
    id: string;
  };
  qualityType: {
    id: number;
  };
  newQualityDefect: IQualityEntry[];
  sampleSize: number;
  checkOutput: string;
  productionTime: string;
  transactionId: string;
  deviceId: string;
  repaired: boolean;
}

export interface RepairEndTableCheckType {
  errors: string;
  repairPassValue: number;
  repairAlterValue: number;
  repairRejectValue: number;
}

export interface PayloadQualityTypeWorkProcess {
  qualityType: number;
  workProcess: number;
}
