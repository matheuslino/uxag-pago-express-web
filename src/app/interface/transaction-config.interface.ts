export interface Company {
  id: string;
  name: string;
  code: string;
}

export interface TransactionConfig {
  id: string;
  companyName: string;
  companyCode: string;
  deposits: boolean;
  withdrawals: boolean;
  depositCommission: boolean;
  transfer: boolean;
  boleto: boolean;
  thirdPartyWithdrawals: boolean;
  division: boolean;
  checkValidation: boolean;
  billPayment: boolean;
  walletTransfer: boolean;
  creditCard: boolean;
}