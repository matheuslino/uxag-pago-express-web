export interface Company {
  id: string;
  name: string;
  code: string;
  icon: string;
}

export interface WithdrawalFeeConfig {
  id: string;
  companyName: string;
  companyCode: string;
  pixIn: PixInFee[];
}

export interface PixInFee {
  minValue: number;
  maxValue: number;
  feePercentage: number;
  minFee: number;
  maxFee: number;
  fixedFee: number;
}