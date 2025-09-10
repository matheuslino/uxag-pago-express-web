export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  userId: string;
  isRead: boolean;
  actionUrl?: string;
  metadata?: any;
  createdAt: Date;
  readAt?: Date;
}

export type NotificationType = 
  | 'transaction' 
  | 'security' 
  | 'system' 
  | 'promotion' 
  | 'account' 
  | 'pix';