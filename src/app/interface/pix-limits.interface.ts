export interface PixLimits {
  id: string;
  companyId: string;
  startTime: string;
  endTime: string;
  dailyValueLimit: number;
  monthlyValueLimit: number;
  dailyQuantityLimit: number;
  walletPercentageLimit: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  document: string;
  icon?: string;
}