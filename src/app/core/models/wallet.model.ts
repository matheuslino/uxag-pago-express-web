import { PixKey } from "./pix.model";

export interface Wallet {
  id: string;
  name: string;
  type: 'savings' | 'checking' | 'business' | 'investment';
  balance: number;
  currency: string;
  userId: string;
  accountNumber: string;
  agency: string;
  isActive: boolean;
  pixKeys: PixKey[];
  limits: WalletLimits;
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletLimits {
  dailyLimit: number;
  monthlyLimit: number;
  pixLimit: number;
  transferLimit: number;
}