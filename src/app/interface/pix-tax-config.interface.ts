export interface PixFee {
  minValue: number;
  maxValue: number;
  feePercentage: number;
  minFee: number;
  maxFee: number;
  fixedFee: number;
}

export interface PixFeeConfig {
  id: string;
  companyName: string;
  companyCode: string;
  pix: PixFee[];
}

export interface Company {
  id: string;
  name: string;
  code: string;
  icon: string;
}