import { Wallet } from "./wallet.model";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: Date;
  address: Address;
  documents: Document[];
  wallets: Wallet[];
  status: 'active' | 'inactive' | 'blocked' | 'pending';
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Document {
  id: string;
  type: 'rg' | 'cnh' | 'passport' | 'proof_of_address' | 'income_proof';
  number: string;
  issuedBy?: string;
  issuedAt?: Date;
  expiresAt?: Date;
  fileUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
}