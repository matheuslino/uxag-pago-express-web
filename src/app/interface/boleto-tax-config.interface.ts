export interface BoletoFee {
  minValue: number;
  maxValue: number;
  feePercentage: number;
  minFee: number;
  maxFee: number;
  fixedFee: number;
}

export interface BoletoFeeConfig {
  id: string;
  companyName: string;
  companyCode: string;
  boleto: BoletoFee[];
}

export interface Company {
  id: string;
  name: string;
  code: string;
  icon: string;
}