// src/app/interfaces/bank-config.interface.ts
export interface BankConfig {
  id: string;
  companyName: string;
  companyCode: string;
  pixIn: string;
  pixOut: string;
  sendPix: string;
  creditCard: string;
  boleto: string;
  billPayment: string;
}

export interface Company {
  id: string;
  name: string;
  code: string;
  icon?: string;
}