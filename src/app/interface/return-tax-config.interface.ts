export interface ReturnFee {
  minValue: number;
  maxValue: number;
  feePercentage: number;
  minFee: number;
  maxFee: number;
  fixedFee: number;
}

export interface ReturnFeeConfig {
  id: string;
  companyName: string;
  companyCode: string;
  return: ReturnFee[];
}

export interface Company {
  id: string;
  name: string;
  code: string;
  icon: string;
}