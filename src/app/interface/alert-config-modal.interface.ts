export interface AlertConfig {
  id: string;
  name: string;
  enabled: boolean;
  timeConfig?: {
    hour?: string;
    minute?: string;
  };
}

export interface ModalData {
  bankName: string;
  bankCode: string;
  alertConfigs: AlertConfig[];
}