export interface LimitConfig {
  id: string;
  companyId: string;
  dailyLimit: number;
  monthlyLimit: number;
  createdBy: string;
  createdAt: Date;
}

export interface Company {
  id: string;
  name: string;
  code: string;
  icon: string;
}
