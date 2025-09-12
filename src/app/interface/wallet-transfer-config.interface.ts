export interface Company {
  id: string;
  name: string;
  code: string;
}

export interface WalletTransferConfig {
  id: string;
  companyName: string;
  companyCode: string;
  deposits: boolean;
  depositsHour: number;
  withdrawals: boolean;
  withdrawalsHour: number;
  wallets: boolean;
  walletsValue: number;
}