export interface SplitFee {
  minValue: number;
  maxValue: number;
  feePercentage: number;
  minFee: number;
  maxFee: number;
  fixedFee: number;
}

export interface SplitFeeConfig {
  id: string;
  companyName: string;
  companyCode: string;
  split: SplitFee[];
}

export interface Company {
  id: string;
  name: string;
  code: string;
  icon: string;
}