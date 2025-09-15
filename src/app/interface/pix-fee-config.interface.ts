export interface PixFeeConfig {
  id: string;
  companyName: string;
  companyCode: string;
  valorMenor: number;
  valorMaior: number;
  taxa: number;
  minimo: number;
  maximo: number;
  fixo: number;
}

export interface Company {
  id: string;
  name: string;
  code: string;
  icon: string;
}