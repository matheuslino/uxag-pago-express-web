import { PixKeyType } from "./pix.model";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  status: TransactionStatus;
  fromWalletId?: string;
  toWalletId?: string;
  fromAccountInfo?: AccountInfo;
  toAccountInfo?: AccountInfo;
  pixInfo?: PixTransactionInfo;
  fees: number;
  createdAt: Date;
  completedAt?: Date;
  receipt?: string;
  tags?: string[];
}

export type TransactionType = 
  | 'transfer' 
  | 'deposit' 
  | 'withdrawal' 
  | 'pix_send' 
  | 'pix_receive' 
  | 'payment' 
  | 'refund';

export type TransactionStatus = 
  | 'pending' 
  | 'processing' 
  | 'completed' 
  | 'failed' 
  | 'cancelled';

export interface AccountInfo {
  name: string;
  cpf?: string;
  bank: string;
  agency: string;
  account: string;
  accountType: 'checking' | 'savings';
}

export interface PixTransactionInfo {
  key: string;
  keyType: PixKeyType;
  endToEndId: string;
}