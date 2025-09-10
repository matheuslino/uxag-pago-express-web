export interface PixKey {
  id: string;
  key: string;
  type: PixKeyType;
  walletId: string;
  isActive: boolean;
  createdAt: Date;
}

export type PixKeyType = 'cpf' | 'email' | 'phone' | 'random';

export interface PixQRCode {
  id: string;
  qrCode: string;
  amount?: number;
  description?: string;
  expiresAt?: Date;
  pixKey: string;
  isActive: boolean;
}