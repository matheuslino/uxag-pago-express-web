export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  avatar?: string;
  role: 'admin' | 'user' | 'manager';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  theme: 'light' | 'dark';
  language: string;
}