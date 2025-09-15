export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  identification: string;
  avatar?: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordChangeResponse {
  success: boolean;
  message: string;
}