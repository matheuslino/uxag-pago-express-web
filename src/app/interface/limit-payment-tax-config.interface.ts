export interface LimitPaymentFee {
  minValue: number;
  maxValue: number;
  feePercentage: number;
  minFee: number;
  maxFee: number;
  fixedFee: number;
}

export interface LimitPaymentFeeConfig {
  id: string;
  companyName: string;
  companyCode: string;
  limitPayment: LimitPaymentFee[];
}

export interface Company {
  id: string;
  name: string;
  code: string;
  icon: string;
}